var express = require('express');
var { json, request } = require('express');
var table = require('text-table');
var inquirer = require('inquirer');
var sql = require("mssql");

var app = express();

// config for your database
var config = {
    user: 'mehdi',
    password: 'Abc@abc123',
    server: 'localhost', 
    database: 'EmpDb',
    "options": {
        "encrypt": true,
        "enableArithAbort": true
        }
};

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from Employee', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            //console.log(recordset);
            
        });
    });

    inquirer.prompt([
        {
            type: 'list', 
            message:'What would you like to do? ',
            name: 'Emps',
            choices: ["View All Employees","Add Employees","Update Employees","Remove Employee"]
        }
    ])
    .then(answers=>{
        console.log('----Selecting option-----');
        console.log(answers);
        console.log(answers.Emps);
        if(answers.Emps=='View All Employees'){
                // connect to your database
            sql.connect(config, function (err) {
            
                if (err) console.log(err);

                // create Request object
                var request = new sql.Request();
                
                // query to the database and get the records
                var CustomeQuery = `SELECT e.Id, e.LastName, e.FirstName, r.Title, r.Salary, d.Name AS Department
                    FROM Employee AS e, Role AS r
                     LEFT JOIN Department AS d on r.DepartmentID = d.Id
                    WHERE e.RoleID = r.Id`;
                request.query(CustomeQuery, function (err, recordset) {
                    
                    if (err) console.log(err)

                    // send records as a response
                
                   console.log(recordset);
                    //console.log(recordset.recordset[0].Id);
                    var ParentArray = new Array();
                        ParentArray.push(['Id','First Name','Last Name','Title','Department','Salary']);
                    var result = recordset.recordset;
                    var tblArry= new Array();
                    result.forEach((items)=>{
                        ParentArray.push([items.Id,items.FirstName,items.LastName, items.Title, items.Department, items.Salary])
                    });
                    //console.log(tblArry);
                    // var t = table([
                    //     ['Id','First Name','Last Name'],
                    // ]);
                    var t = table(ParentArray);

                    console.log(t);
                    
                });
            });
            
        }else if(answers.Emps=='Add Employees'){
            inquirer.prompt([
                {
                    type: 'input', 
                    message:'Enter First Name: ',
                    name: 'FirstName',
                },
                {
                    type: 'input', 
                    message:'Enter Last Name: ',
                    name: 'LastName',
                },
                {
                    type: 'list', 
                    message:'Select Role ',
                    name: 'Role',
                    choices: ["Software Engineer","Admin Officer","Receiption","Engineer"]
                }
            ]).then(answers=>{
                //console.log(answers.FirstName);
                //console.log(answers.LastName);
                var FirstName = answers.FirstName;
                var LastName = answers.LastName;
                var Role = answers.Role;
                var RoleID;
                if(Role=="Software Engineer"){
                    RoleID = 1;
                }else if(Role=="Admin Officer"){
                    RoleID = 2;
                }else if(Role=="Receiption"){
                    RoleID = 3;
                }else if(Role=="Engineer"){
                    RoleID = 4
                }
                //console.log(Role);
                sql.connect(config, function (err) {
            
                    if (err) console.log(err);
    
                    // create Request object
                    var request = new sql.Request();
                    var InsertQuery = `Insert INTO dbo.Employee (FirstName, LastName, RoleID) VALUES ('`+FirstName+`','`+LastName+`',`+RoleID+`)`;
                    //var InsertQuery = "Insert INTO dbo.Employee (FirstName, LastName, RoleID) VALUES ('test','mist',1)";

                    request.query(InsertQuery,(err,result)=>{
                        if(err){
                            console.log(err);
                        }
                        //console.log(result);
                        if(result.rowsAffected>0){
                            console.log('\n------->>>>>---New record inserted successfully---<<<<<------------');
                        }
                    })

                })
            })
        }else if(answers.Emps=='Update Employees'){

            sql.connect(config, function (err) {
            
                if (err) console.log(err);

                // create Request object
                var request = new sql.Request();
                
                // query to the database and get the records
                var CustomeQuery = `SELECT e.LastName, e.FirstName
                    FROM Employee AS e`;
                request.query(CustomeQuery, function (err, recordset) {
                    
                    if (err) console.log(err)

                    // send records as a response
                
                   //console.log(recordset);
                   var result = recordset.recordset;
                   var EmployeeList = new Array();
                   result.forEach((items)=>{
                    EmployeeList.push(items.FirstName)
                     });
                   inquirer.prompt([
                        {
                            type: 'list', 
                            message:'Provide your details',
                            name: 'Emps',
                            choices: EmployeeList
                        }
                    ]).then(answers=>{
                        //console.log(answers);
                        var FirstNameOfUser = answers.Emps;
                        console.log('----Enter new changes for Employee: '+answers);
                        inquirer.prompt([
                            {
                                type: 'input', 
                                message:'Enter First Name: ',
                                name: 'FirstName',
                            },
                            {
                                type: 'input', 
                                message:'Enter Last Name: ',
                                name: 'LastName',
                            },
                            {
                                type: 'list', 
                                message:'Select Role ',
                                name: 'Role',
                                choices: ["Software Engineer","Admin Officer","Receiption","Engineer"]
                            }
                        ]).then(answers=>{
                            var FirstName = answers.FirstName;
                            var LastName = answers.LastName;
                            var Role = answers.Role;
                            var RoleID;
                            if(Role=="Software Engineer"){
                                RoleID = 1;
                            }else if(Role=="Admin Officer"){
                                RoleID = 2;
                            }else if(Role=="Receiption"){
                                RoleID = 3;
                            }else if(Role=="Engineer"){
                                RoleID = 4
                            }
                            //console.log(Role);
                            sql.connect(config, function (err) {
                        
                                if (err) console.log(err);
                                //console.log(FirstNameOfUser);
                                // create Request object
                                var request = new sql.Request();
                                var updateQuery = `UPDATE Employee SET FirstName ='`+FirstName+`', LastName = '`+LastName+`', RoleID=`+RoleID+` WHERE FirstName ='`+FirstNameOfUser+`'`;
                                //var InsertQuery = "Insert INTO dbo.Employee (FirstName, LastName, RoleID) VALUES ('test','mist',1)";

                                request.query(updateQuery,(err,result)=>{
                                    if(err){
                                        console.log(err);
                                    }
                                    console.log(result);
                                    if(result.rowsAffected>0){
                                        console.log('\n------->>>>>---Record updated successfully---<<<<<------------');
                                    }
                                })

                            })
                        })
                    })
      
                    
                });
            });
        }else if(answers.Emps=='Remove Employee'){

            sql.connect(config, function (err) {
            
                if (err) console.log(err);

                // create Request object
                var request = new sql.Request();
                
                // query to the database and get the records
                var CustomeQuery = `SELECT e.LastName, e.FirstName
                    FROM Employee AS e`;
                request.query(CustomeQuery, function (err, recordset) {
                    
                    if (err) console.log(err)

                    // send records as a response
                
                  // console.log(recordset);
                   var result = recordset.recordset;
                   var EmployeeList = new Array();
                   result.forEach((items)=>{
                    EmployeeList.push(items.FirstName)
                     });
                   inquirer.prompt([
                        {
                            type: 'list', 
                            message:'Provide your details',
                            name: 'Emps',
                            choices: EmployeeList
                        }
                    ]).then(answers=>{
                       
                            console.log(answers.Emps);

                            FirstNameOfUser = answers.Emps;
                            console.log(FirstNameOfUser);

                            sql.connect(config, function (err) {
                        
                                if (err) console.log(err);
                                console.log(FirstNameOfUser);
                                // create Request object
                                var request = new sql.Request();
                                var updateQuery = `DELETE FROM Employee WHERE FirstName = '`+FirstNameOfUser+`'`;
                                //var InsertQuery = "Insert INTO dbo.Employee (FirstName, LastName, RoleID) VALUES ('test','mist',1)";

                                request.query(updateQuery,(err,result)=>{
                                    if(err){
                                        console.log(err);
                                    }
                                    console.log(result);
                                    if(result.rowsAffected>0){
                                        console.log('\n------->>>>>---Record Removed successfully---<<<<<------------');
                                    }
                                })

                            })
                        
                    })
      
                    
                });
            });
        }
    
    });

var server = app.listen(5000, function () {
    console.log('Server is running..');
});