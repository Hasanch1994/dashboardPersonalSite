import { useQuery } from "react-query";
import { fetchSkillsApi } from "../../libs/services/endpoints/actions";

const Main = () => {
  const {} = useQuery("skills", fetchSkillsApi, {
    onSuccess: (data) => {
      console.log("data on success", data);
    },
    onError: (err) => {
      console.log("error ", err);
    },
  });

  return (
    <div>
      <h1></h1>
    </div>
  );
};

export default Main;
