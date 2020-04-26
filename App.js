import React from 'react';
import './App.css';
import ListItems from './ListItems';
import Footer from './footer'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {
        text: '',
        key: '',
      },
      allCheck: false,
      display: "all"

    }
    this.inputItem = this.inputItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);


  }
  inputItem(e) {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now(),
        isChecked: false,
        isDisplay: false
      }
    })
  }
  handleUpdate = (e) => {
    let array = this.state.items;
    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      array[i].text = array[i].text
      if (item.key === e) {
        if (item.isDisplay === false) {
          (array[i].isDisplay = true)
        } else {
          (array[i].isDisplay = false)
        }
      }

    }
    this.setState({ items: array })
  }

  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== "") {
      const newItems = [...this.state.items, newItem];
      let array = [];
      let total = [];
      array = this.state.items;
      total = this.state.items.filter((item) => !item.isChecked);
      let allCheck = false;
      if (array.length >= total.length) {
        allCheck = false
      } else {
        allCheck = true
      }
      this.setState({
        allCheck: allCheck,
        items: newItems,
        currentItem: {
          text: '',
          key: '',
          completed: 'false'

        }
      })


    }
  }
  deleteItem(key) {
    const filterItem = this.state.items.filter(item =>
      item.key !== key);

    let check = [];
    let checkAll = false;
    check = filterItem.filter((item) => item.isChecked)
    if (check.length > 0 && filterItem.length === check.length) {
      checkAll = true;
    } else {
      checkAll = false;
    }

    this.setState({
      items: filterItem, allCheck: checkAll
    })

  }
  setUpdate(text, key) {
    const arr = this.state.items;
    arr.map(item => {
      if (item.key === key) {
        item.text = text;
      }
    })
    this.setState({
      items: arr
    })
  }
  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      let arr = this.state.items;
      arr.map(item => {
        const array = item;
        if (array.isDisplay === true) {
          (item.isDisplay = false)
        }
      })
      this.setState({
        items: arr
      })
    }
  }
  hanldeChecked = (e) => {
    let array = this.state.items;
    let check = [];
    let allCheck = false;
    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      if (item.key === e) {
        if (!item.isChecked) {
          array[i].isChecked = true;
        } else {
          array[i].isChecked = false;
        }
      }
      check = this.state.items.filter((item) => item.isChecked)

      if (this.state.items.length === check.length) {
        allCheck = true
      } else {
        allCheck = false;
      }

      this.setState({ items: array, allCheck: allCheck })
    }
  }
  checkedAll = (e) => {

    let array = this.state.items;
    let checkValue = e.target.checked;
    array.map(item => {
      if (checkValue) {
        item.isChecked = checkValue
      } else {
        item.isChecked = checkValue;
      }
    })
    this.setState({ items: array, allCheck: checkValue })
  }

  displayAll = (value) => {

    // let allCheck = this.state.allCheck;

    // let totalCheck = [];
    // totalCheck = this.state.items.filter((item) => item.isChecked)

    // if (value === "all") {
    //   if (this.state.items.length > totalCheck.length && allCheck) {
    //     allCheck = false;

    //   } else if (this.state.items.length === totalCheck.length && !allCheck) {
    //     allCheck = true;
    //   }
    // }
    // if (value === "completed") {
    //   if (totalCheck.length < this.state.items.length) {
    //     allCheck = false;
    //   } else {
    //     allCheck = true;
    //   }
    // }
    this.setState({ display: value,
      //  allCheck: allCheck
       })
  }
  deleteAll = (e) => {
    let arr = this.state.items;
    arr = arr.filter(item => !item.isChecked)
    if (this.state.allCheck === true) {
      this.setState({ items: arr, allCheck: false })
    } else {
      this.setState
        ({
          items: arr
        })
    }

  }
  render() {
    let array = [];
    let total = [];
    total = this.state.items.filter((item) => !item.isChecked)
    let selectBtn;
    if (this.state.display === "active") {
      selectBtn = "active"
      array = this.state.items.filter((item) => {
        return !item.isChecked;
      })
    } else if (this.state.display === "all") {
      selectBtn = "all"
      array = this.state.items;

    } else {
      selectBtn = "completed"
      array = this.state.items.filter((item) => {
        return item.isChecked
      })
    }
    return (
      <div className="app">
        <div>
          <div className="todo">
            <div>
              <form onSubmit={this.addItem}>
                <p className="title">todo</p>
                <div className="element">
                  <input type="checkbox" className="mainChk" checked={this.state.allCheck} onChange={this.checkedAll}></input>
                  <input className="txtbox" type="textbox" placeholder="Enter item" value={this.state.currentItem.text}
                    onChange={this.inputItem}></input>
                  {/* <button className="btn" type="submit">Add</button> */}
                </div>
              </form>
            </div>
            <table className="listItem">
              <ListItems items={array}
                deleteItem={this.deleteItem}
                handleUpdate={this.handleUpdate}
                setUpdate={this.setUpdate}
                handleKeyPress={this.handleKeyPress}
                hanldeChecked={this.hanldeChecked}>  </ListItems>
            </table> <br />
            <Footer displayAll={this.displayAll} total={total}
              deleteAll={this.deleteAll} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
