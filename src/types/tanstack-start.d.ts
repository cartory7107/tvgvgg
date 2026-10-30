declare module "@tanstack/react-start" {
  export const createServerFn: any;
  export const useServerFn: any;
  export const json: any;
  export const createMiddleware: any;
}

declare module "@tanstack/react-start/server" {
  export const getWebRequest: any;
}

declare module "@tanstack/react-router" {
  export const createFileRoute: any;
  export const Link: any;
  export const useNavigate: any;
  export const useRouter: any;
  export const useParams: any;
  export const useSearch: any;
  export const Outlet: any;
  export const createRootRouteWithContext: any;
  export const HeadContent: any;
  export const Scripts: any;
  export const notFound: any;
  export const redirect: any;
}

declare module "zod" {
  export const z: any;
  export default z;
}

declare module "ai" {
  export const generateText: any;
  export const streamText: any;
}

declare module "@ai-sdk/openai-compatible" {
  export const createOpenAICompatible: any;
}

declare module "react-hook-form" {
  export const useForm: any;
  export const FormProvider: any;
  export const useFormContext: any;
  export const Controller: any;
}

declare module "cmdk" {
  export const Command: any;
}

declare module "vaul" {
  export const Drawer: any;
}

declare module "recharts" {
  export const ResponsiveContainer: any;
  export const BarChart: any;
  export const LineChart: any;
  export const PieChart: any;
}

declare module "input-otp" {
  export const OTPInput: any;
  export const OTPInputContext: any;
}

declare module "react-day-picker" {
  export const DayPicker: any;
}

declare module "embla-carousel-react" {
  const useEmblaCarousel: any;
  export default useEmblaCarousel;
}

declare module "react-resizable-panels" {
  export const PanelGroup: any;
  export const Panel: any;
  export const PanelResizeHandle: any;
}

declare module "@radix-ui/react-*" {
  const comp: any;
  export default comp;
  export const Root: any;
  export const Trigger: any;
  export const Content: any;
  export const Item: any;
  export const Portal: any;
  export const Overlay: any;
  export const Close: any;
}
