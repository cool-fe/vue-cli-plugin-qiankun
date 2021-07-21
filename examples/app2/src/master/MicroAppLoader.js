import { Spin } from "ant-design-vue";

export default function MicroAppLoader(loading) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return {
    render(h) {
      return h(Spin, {
        props: {
          spinning: loading,
          size: "large",
          style,
        },
      });
    },
  };
}
