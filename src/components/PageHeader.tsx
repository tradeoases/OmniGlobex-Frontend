// import { Link } from "react-router-dom";

interface Props {
  name: string;
  route?: string;
}

export const PageHeader: React.FC<Props> = ({ name, route }) => {
  console.log({route});
  
  return (
    <div className="w-full bg-[#FFFAEF] py-10">
      {/* <p className="text-sm font-light w-10/12 xl:w-8/12 mx-auto">
        <Link to="/" className=" hover:underline">
          Home
        </Link>{" "}
        {route}
      </p> */}
      <div className="text-3xl font-bold w-full text-center">{name}</div>
    </div>
  );
};
