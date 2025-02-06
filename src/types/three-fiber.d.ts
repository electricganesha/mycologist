import { ThreeElements } from "@react-three/fiber";

declare module "@react-three/fiber" {
  interface ThreeElements {
    mesh: any;
    group: any;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}
