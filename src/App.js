import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {AgGridReact} from "ag-grid-react";
import MoodRenderer from "./MoodRenderer";
import MoodEditor from "./MoodEditor";
import NumericEditor from "./NumericEditor";

class App extends Component {
  render() {
    return (
      <div className="App">
      <EditorComponentsExample/>
      </div>
    );
  }
}

class EditorComponentsExample extends Component {
    constructor(props) {
        super(props);


        this.state = {
            rowData: this.createRowData(),
            columnDefs: this.createColumnDefs(),
            jsonReturnedValue: []
        };

        this.onGridReady = this.onGridReady.bind(this);
    }

    componentDidMount() {
        this.jsonList();
      }

      jsonList() {
         fetch('http://localhost:8080/phonetool/tree/1000')
        .then(function(response) {
          this.setState({
            jsonReturnedValue: response.json()
          })
        })
      }

  sendData(){
    fetch('http://localhost:8080/phonetool/createtree', {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
   },
   body: JSON.stringify({jsonReturnedValue})
   })}
   
    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    }

    createColumnDefs() {
        return [
            {headerName: "EmployeeId", field: "employeeId", width: 300},
            {
                headerName: "Name",
                field: "name",
                cellRendererFramework: MoodRenderer,
                cellEditorFramework: MoodEditor,
                editable: true,
                width: 250
            },
            {
                headerName: "ParentId",
                field: "parentId",
                cellEditorFramework: NumericEditor,
                editable: true,
                width: 250
            },
            {
                headerName: "JoiningDate",
                field: "joinDate",
                cellEditorFramework: NumericEditor,
                editable: true,
                width: 250
            }
        ];
    }

    createRowData() {
        return this.state.jsonReturnedValue;
    }

    render() {
        return (
            <div style={{height: 400, width: 945}}
                 className="ag-fresh">
                <h1>Cell Editor Component Example</h1>
                <AgGridReact
                    // properties
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}

                    // events
                    onGridReady={this.onGridReady}>
                </AgGridReact>
            </div>
        );
    }
};

export default App;
