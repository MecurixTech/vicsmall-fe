interface TextErrorProps {
  children: React.ReactNode;
}

const TextError = (props: TextErrorProps) => {
  return <p className="mt-1 text-xs text-red-400">{props.children}</p>;
};

export default TextError;
