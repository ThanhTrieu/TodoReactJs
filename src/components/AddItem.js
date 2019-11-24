import React from 'react';

function FromAddItem(props) {
  // props : la object bao gom changeInput va valueInput va onSubmit
  let display = props.error ? {display: "block"} : {display: "none"};
  return(
    <div className="row">
      <div className="col-12 col-md-12 col-sm-12 col-lg-12 col-xl-12">
        <p style={display} className="text-danger text-center"> Vui long nhap du lieu</p>
        <form onSubmit={props.onSubmit}>
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

function ListTodoWork(props) {
  // hien thi danh sach cong viec duoc them
  return(
    <div className="row my-2">
      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <ul className="list-group">
        { props.listWorks.map((item, index) => (
          <li className="list-group-item" key={item.id}>
            <i onClick={()=> props.donework(index)} className="fa fa-check btn mr-2" aria-hidden="true"></i>

            {item.works}

            <i onClick={()=> props.remove(index)} className="fa fa-trash float-right btn" aria-hidden="true"></i>
          </li>
        ))}
         
        </ul>
      </div>
    </div>
  )
}

function ListDoneWork(props) {
  return(
    <div className="row my-2">
      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <ul className="list-group">
        {props.listWork.map((item, index) => (
          <li className="list-group-item bg-success text-white" key={item.id}>
            <i onClick={()=> props.undo(index)} className="fa fa-undo mr-2" aria-hidden="true"></i>
            {item.works}
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
}

class AddItemTodo extends React.Component {
  constructor(props){
    super(props);
    // bind con tro this cho method changeItems
    this.changeItems = this.changeItems.bind(this);
    this.submitAddItem = this.submitAddItem.bind(this);
    this.removeItemWork = this.removeItemWork.bind(this);
    this.doneItemWork = this.doneItemWork.bind(this);
    this.undoDoneWork = this.undoDoneWork.bind(this);

    // khai bao state
    this.state = {
      listWorks: [],
      doneWorks:[],
      nameWork: '',
      error: false
    };
  }

  // nguoi dung nhap du lieu vao o input
  changeItems(event) {
    let nameWork = event.target.value; // lay noi dung ma nguoi dung nhap vao o input
    /*
    */
   // set gia tri nay vao trong state
   this.setState({nameWork: nameWork});
  }

  // hanh dong nguoi bam button add
  submitAddItem(event) {
    event.preventDefault(); // xoa bo cac su kien mac dinh cua trinh duyet tac dong phan tu html
    // nguoi dung phai nhap du lieu
    if(this.state.nameWork.length > 0) {
      const newWorks = {
        id: Date.now(), // ma cong viec
        works: this.state.nameWork,
        done: false
      };
      // gan cong viec vao state listwork
      this.setState(state => ({
        // lay lai ca state va state moi
        listWorks: [...state.listWorks, newWorks],
        nameWork: ''
      }));

      this.setState({error: false});

    } else {
      this.setState({error: true});
      //this.state.error = true;
    }
  }

  removeItemWork(indexItem){
    // xoa cong viec khoi state listwork
    // set lai state
    this.state.listWorks.splice(indexItem, 1);
    this.setState(state => ({
      listWorks: state.listWorks,
      nameWork: ''
    }));
  }

  doneItemWork(indexItem) {
    // xoa khoi state listwork
    // them vao state done work - thay doi trang thai
    // lay ra - tim ra cong viec ma nguoi dung bam hoan thanh
    let todo = this.state.listWorks[indexItem];
    this.state.listWorks.splice(indexItem, 1);

    // chuyen trang thai cong viec
    todo.done = !todo.done;
    // them vao donework
    this.setState(state => ({
      doneWorks: [...state.doneWorks, todo],
      nameWork: ''
    }));
    // xet lai state cho listwork vi co 1 cong viec bi hoan thanh
    this.setState({listWorks: this.state.listWorks});
  }

  undoDoneWork(indexItem){
    let todo = this.state.doneWorks[indexItem];
    this.state.doneWorks.splice(indexItem, 1);

    todo.done = !todo.done;
    // xet state
    // cho done work
    this.setState({doneWorks: this.state.doneWorks});
    // cho list work
    this.setState(state => ({
      listWorks: [...state.listWorks, todo],
      nameWork: ''
    }));
  }

  render(){
    return(
      <div>
        <FromAddItem
          changeInput={this.changeItems} // tao ra 1 prop cho component
          valueInput={this.state.nameWork}
          onSubmit={this.submitAddItem}
          error={this.state.error}
        />
        <ListTodoWork
          listWorks={this.state.listWorks}
          remove={this.removeItemWork}
          donework={this.doneItemWork}
        />

        <ListDoneWork
          listWork={this.state.doneWorks}
          undo={this.undoDoneWork}
        />
      </div>
    );
  }
}

export default AddItemTodo;