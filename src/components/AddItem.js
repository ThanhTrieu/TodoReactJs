import React from 'react';

function FromAddItem(props) {
  // props : la object bao gom changeInput va valueInput
  return(
    <div className="row">
      <div className="col-12 col-md-12 col-sm-12 col-lg-12 col-xl-12">
        <form>
          <div className="input-group mb-3">
            <input 
              type="text"
              className="form-control"
              onChange={props.changeInput} // bat su kien onchange
              value={props.valueInput} // hien thi gia tri khi nguoi dung nhap vao
            />
            <div className="input-group-append">
              <button className="input-group-text btn">Add</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

function listTodoWrok(props) {

}

function listDoneWork(props) {

}

class AddItemTodo extends React.Component {
  constructor(props){
    super(props);
    // bind con tro this cho method changeItems
    this.changeItems = this.changeItems.bind(this);
    // khai bao state
    this.state = {listWorks: [], doneWorks:[], nameWork: ''};
  }

  changeItems(event) {
    let nameWork = event.target.value; // lay noi dung ma nguoi dung nhap vao o input
    /*
    const newWorks = {
      id: Date.now(), // ma cong viec
      works: nameWork,
      done: false
    };
    */
   // set gia tri nay vao trong state
   this.setState({nameWork: nameWork});
  }

  render(){
    return(
      <div>
        <FromAddItem
          changeInput={this.changeItems} // tao ra 1 prop cho component
          valueInput={this.state.nameWork}
        />
      </div>
    );
  }
}

export default AddItemTodo;