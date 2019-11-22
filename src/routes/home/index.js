import React from 'react';
import {useQuery, useLazyQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";

const TASK_LIST_QUERY = gql`
    query TaskQuery($filter: TaskFilter){
        tasksList(filter: $filter){
            count
            items {
                name
                description
                createdAt
                done
            }
        }
    }
`;

const USER_QUERY = gql`
    {
        user{
            id
            email
        }
    }
`;

const Tasks = ({user}) => {
  const {data, loading} = useQuery(TASK_LIST_QUERY, {
    variables: {
      "filter": {
        "assignee": {
          "id": {
            "equals": user ? user.id : null
          }
        }
      }
    }
  });

  if (!user || loading)
    return null;

  const {tasksList: {items}} = data;
  return items.map((task, i) => <p key={i}>{task.name}</p>);
};

const Home = () => {
  const {data, loading} = useQuery(USER_QUERY);
  if (loading === true)
    return <div className={'loading'}>Loading...</div>;

  const {user} = data;
  return (
    <div>
      <h1>Tasks!</h1>
      <Tasks user={user}/>
    </div>
  );
};

export {Home};
