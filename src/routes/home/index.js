import React from 'react';
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";

const TASK_LIST_QUERY = gql`
    {
        tasksList{
            count
            items {
                name
                description
                createdAt
            }
        }
    }
`;

const Home = () => {
  const {data, loading, error} = useQuery(TASK_LIST_QUERY);
  console.log(`DEBUG:`, data, loading, error);

  if (loading === true)
    return <div className={'loading'}>Loading...</div>;

  const {tasksList: {items}} = data;

  return (
    <div>
      <h1>Tasks!</h1>
      {items.map((task, i) => <p key={i}>{task.name}</p>)}
    </div>
  );
};

export {Home};
