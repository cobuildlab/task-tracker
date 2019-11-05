import React from 'react';
import {useMutation} from "@apollo/react-hooks";
import gql from "graphql-tag";

const TASK_LIST_MUTATION = gql`
    mutation ($data: TaskCreateInput!){
        taskCreate(data:$data){
            id
        }
    }
`;

const NewTaskForm = () => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const [createTask] = useMutation(TASK_LIST_MUTATION);

  const createNewTask = async (e) => {
    e.preventDefault();
    const variables = {
      data: {
        name, description
      }
    };
    try {
      await createTask({variables});
    }catch (e) {
      console.log(`ERROR:`, e);
    }
    setSuccess(true);
  };
  return (
    <div>
      <h1>New Task</h1>
      <span>{success && 'Task Created'}</span>
      <form>
        <p> Name: <input name={'name'} onChange={(e) => setName(e.target.value)} value={name}/></p>
        <p> Description: <input name={'description'} onChange={(e) => setDescription(e.target.value)}
                                value={description}/></p>
        <button onClick={createNewTask}>
          CREATE TASK
        </button>
      </form>
    </div>
  );
};

export {NewTaskForm};
