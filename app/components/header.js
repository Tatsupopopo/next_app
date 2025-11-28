export default function Header(props) {
  return (
    <div>
      <h1 className="bg-primary text-white px-3 display-4 text-right">
        {props.header}
      </h1>
    </div>
  );
}
