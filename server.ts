import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import {
  getTopToolsBundle,
  searchTools,
  getVerifiedPool,
  getCatalog,
  normalizeCategory,
} from "./src/lib/catalog-server.ts";

const FALLBACK_NEWS = [
  { title: "Frontier labs push agentic AI into everyday productivity apps", time: "2h ago", url: "https://openai.com/news", source: "AI News" },
  { title: "Open-weight models keep closing the gap with closed frontier systems", time: "4h ago", url: "https://huggingface.co/blog", source: "AI News" },
  { title: "AI coding assistants become the default developer workflow", time: "6h ago", url: "https://github.blog", source: "AI News" },
  { title: "Real-time video generation moves from demo to production tooling", time: "8h ago", url: "https://stability.ai/news", source: "AI News" },
  { title: "On-device AI assistants expand to more languages and regions", time: "10h ago", url: "https://blog.google/technology/ai/", source: "AI News" },
  { title: "Enterprises shift budgets from pilots to deployed AI agents", time: "12h ago", url: "https://www.microsoft.com/en-us/ai", source: "AI News" },
  { title: "AI data-centre demand reshapes chip roadmaps", time: "15h ago", url: "https://blogs.nvidia.com", source: "AI News" },
  { title: "Regulators sharpen transparency rules for general-purpose AI", time: "18h ago", url: "https://digital-strategy.ec.europa.eu", source: "AI News" },
  { title: "Voice AI quality improves as latency drops below human response time", time: "20h ago", url: "https://elevenlabs.io/blog", source: "AI News" },
  { title: "AI research agents start co-authoring published papers", time: "1d ago", url: "https://www.anthropic.com/news", source: "AI News" },
];

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Trust Cloudflare / Cloud Run proxy headers (X-Forwarded-Proto, X-Forwarded-For)
  app.set("trust proxy", true);

  app.use(express.json());

  // Top tools bundle endpoint
  app.get("/tools-api.json", (_req, res) => {
    try {
      const data = getTopToolsBundle();
      res.setHeader("Cache-Control", "public, max-age=10");
      res.json(data);
    } catch (err) {
      console.error("Error generating top tools bundle:", err);
      res.status(500).json({ error: "Failed to load tools bundle" });
    }
  });

  // Search and browse endpoint
  app.get("/search-api.json", (req, res) => {
    try {
      const q = typeof req.query.q === "string" ? req.query.q : "";
      const category = typeof req.query.category === "string" ? req.query.category : "All";
      const pricing = typeof req.query.pricing === "string" ? req.query.pricing : "All";
      const sort = typeof req.query.sort === "string" ? req.query.sort : "";
      const offset = parseInt(String(req.query.offset || "0"), 10) || 0;
      const limit = parseInt(String(req.query.limit || "20"), 10) || 20;

      const data = searchTools({ q, category, pricing, sort, offset, limit });
      res.setHeader("Cache-Control", "public, max-age=10");
      res.json(data);
    } catch (err) {
      console.error("Error searching tools:", err);
      res.status(500).json({ results: [], total: 0 });
    }
  });

  // Exclusive and featured tools
  app.get("/exclusive-api.json", (_req, res) => {
    try {
      const verifiedPool = getVerifiedPool();
      const catalog = getCatalog();
      const exclusives = verifiedPool.slice(0, 50).map((v) => {
        const full = catalog.tools.find((t) => t.n === v.n);
        return {
          n: v.n,
          d: full?.d || v.d,
          c: v.c,
          g: v.g,
          p: v.p,
          u: v.u,
          fl: v.fl,
        };
      });
      res.setHeader("Cache-Control", "public, max-age=300");
      res.json({ exclusives });
    } catch (err) {
      console.error("Error loading exclusives:", err);
      res.status(500).json({ exclusives: [] });
    }
  });

  // AI news feed
  app.get("/ai-news-api.json", (_req, res) => {
    res.setHeader("Cache-Control", "public, max-age=300");
    res.json(FALLBACK_NEWS);
  });

  // Google Auth Config
  app.get("/api/auth/config", (_req, res) => {
    res.json({
      clientId:
        process.env.GOOGLE_CLIENT_ID ||
        "13710800504-c1u29vvlc62vkm12deruf69rqeg0b2k4.apps.googleusercontent.com",
    });
  });

  // Verify Google token
  app.post("/api/auth/google/verify", async (req, res) => {
    try {
      const { credential, accessToken } = req.body || {};
      if (credential) {
        // Verify ID token with Google's public endpoint
        const gRes = await fetch(
          `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`
        );
        if (!gRes.ok) {
          return res.status(401).json({ error: "Invalid Google token" });
        }
        const gData = await gRes.json();
        return res.json({
          user: {
            id: gData.sub,
            email: gData.email,
            name: gData.name || gData.email.split("@")[0],
            avatar_url: gData.picture,
            provider: "google",
          },
        });
      } else if (accessToken) {
        // Verify access token with Google userinfo
        const gRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!gRes.ok) {
          return res.status(401).json({ error: "Invalid access token" });
        }
        const profile = await gRes.json();
        return res.json({
          user: {
            id: profile.sub,
            email: profile.email,
            name: profile.name || profile.email.split("@")[0],
            avatar_url: profile.picture,
            provider: "google",
          },
        });
      }
      return res.status(400).json({ error: "Missing credential or token" });
    } catch (e: any) {
      console.error("Error in /api/auth/google/verify:", e);
      return res.status(500).json({ error: "Internal auth error" });
    }
  });

  // Google OAuth redirect callback endpoint
  app.get("/api/auth/callback/google", async (req, res) => {
    const code = req.query.code as string;
    const error = req.query.error as string;
    if (error || !code) {
      return res.redirect(`/auth?error=${encodeURIComponent(error || "No code provided")}`);
    }

    try {
      const clientId =
        process.env.GOOGLE_CLIENT_ID ||
        "13710800504-rn24c24bv78sibhk1rvlisugl3ahjokh.apps.googleusercontent.com";
      const clientSecret =
        process.env.GOOGLE_CLIENT_SECRET || "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";
      const redirectUri = `${req.protocol}://${req.get("host")}/api/auth/callback/google`;

      // Exchange code for token
      const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        }),
      });

      const tokenData = await tokenRes.json();
      if (!tokenRes.ok || !tokenData.access_token) {
        console.error("Token exchange error:", tokenData);
        return res.redirect("/auth?error=Failed+to+exchange+token");
      }

      // Fetch user profile
      const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });
      const profile = await userRes.json();

      const user = {
        id: profile.sub,
        email: profile.email,
        name: profile.name || profile.email?.split("@")[0],
        avatar_url: profile.picture,
        provider: "google",
      };

      // Output small HTML that saves user in localStorage and redirects to /
      return res.send(`
        <!DOCTYPE html>
        <html>
          <body>
            <script>
              localStorage.setItem("tavbook_auth_user", ${JSON.stringify(JSON.stringify(user))});
              window.location.href = "/";
            </script>
          </body>
        </html>
      `);
    } catch (err: any) {
      console.error("Google callback error:", err);
      return res.redirect("/auth?error=Google+login+failed");
    }
  });

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", app: "MarkBook AI Hub" });
  });

  // Vite middleware in dev, static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MarkBook AI Hub server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
