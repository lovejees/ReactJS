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
            columnDefs: this.createColumnDefs()
        };

        this.onGridReady = this.onGridReady.bind(this);
    }

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
        return [
          {"name":"b","employeeId":1005,"parentId":1000,"joinDate":"2012-04-24",},
          {"name":"e","employeeId":1035,"parentId":1000,"joinDate":"2014-07-12"},
          {"name":"t","employeeId":2001,"parentId":1000,"joinDate":null},
        ];
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
