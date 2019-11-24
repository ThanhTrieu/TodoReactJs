import React from 'react';
// su dung thu vien React
// import header
import MyHeader from './components/Header';
// import footer
import MyFooter from './components/Footer';
// item todo list
import AddItemTodo from './components/AddItem';


class TodoApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // tat ca cac ma hmtm nam trong return goi la JSX
    return(
      <div className="container mt-3 border">
        <MyHeader />
        <AddItemTodo />
        <MyFooter />
      </div>
    );
  }
}
export default TodoApp;
