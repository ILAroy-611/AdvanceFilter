import { Button } from "antd";

function ButtonAntd({ children, handleClick, type="primary", size="small", shape="default" }) {
  return (
    <>
      <Button type={type} onClick={handleClick} size={size} shape={shape}>
        {children}
      </Button>
    </>
  );
}

export default ButtonAntd;
