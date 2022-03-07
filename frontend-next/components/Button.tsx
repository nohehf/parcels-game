interface Props {
  text: string;
}

const Button: React.FC<Props> = ({ children, text }) => {
  return (
    <div className="p-2 bg-white text-black flex flex-wrap justify-center"></div>
  );
};

export default Button;
