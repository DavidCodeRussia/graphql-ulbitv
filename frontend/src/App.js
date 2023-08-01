import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "./query/user";
import { CREATE_USER } from "./mutations/user";
import { GET_USER } from "./query/user";
import "./App.css";

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const { data2, loading2, error2, refetch2 } = useQuery(GET_USER, {
    variables: {
      id: 777,
    },
  });
  const [newUser] = useMutation(CREATE_USER);

  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  const addUser = (e) => {
    e.preventDefault();
    newUser({
      variables: {
        input: {
          username,
          age,
        },
      },
    }).then((res) => {
      console.log("res", res);
      setUsername("");
      setAge(0);
    });
  };

  const getAll = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div>
      <form action="">
        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
        <input value={age} onChange={(e) => setAge(+e.target.value)} type="number" />
        <div>
          <button onClick={addUser}>Создать</button>
          <button onClick={getAll}>Получить</button>
        </div>
      </form>
      <div>
        {users.map((user, key) => (
          <div key={key}>
            {user.id}. {user.username} {user.age}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
