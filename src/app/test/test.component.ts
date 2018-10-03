import { Component, OnInit } from '@angular/core';
import { TestService } from  '../service/test.service';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private  testService:  TestService) { }

  ngOnInit() {
  }

  testRun(){
    console.log("testRun clicked");
    this.testService.testRunWizard().subscribe( data => {
      console.log(data);
    },err=>{
      console.log("error:"+err);
    });
    
  }
  
  testCreateFolder(){
    console.log("testCreateFolder clicked");
    this.testService.testCreateFolder().subscribe( data => {
      console.log(data);
    },err=>{
      console.log("error:"+err);
    });
  }
  
  testWriteFile(){
    console.log("testWriteFile clicked");
    this.testService.testWriteFile().subscribe( data => {
      console.log(data);
    },err=>{
      console.log("error:"+err);
    });
  }
  
  testRestartService(){
    console.log("testRestartService clicked");
    this.testService.testRestartService().subscribe( data => {
      console.log(data);
    },err=>{
      console.log("error:"+err);
    });
  }
  
  testStartCore(){
    console.log("testStartCore clicked");
    this.testService.testStartCore().subscribe( data => {
      console.log(data);
    },err=>{
      console.log("error:"+err);
    });
  }
  
  testDependency(){
    console.log("testDependency clicked");
    this.testService.testDependencyMock().subscribe( data => {
      console.log(data);
    },err=>{
      console.log("error:"+err);
    });
  }
  
  testLogin(){
    console.log("testLogin clicked");
    this.testService.testLogin().subscribe( data => {
      console.log(data);
    },err=>{
      console.log("error:"+JSON.stringify(err));
    });
  }
  
  testGetUser(){
    console.log("testGetUser clicked");
    this.testService.testGetUser().subscribe( data => {
      console.log(data);
    },err=>{
      console.log("error:"+err);
    });
  }
  
  testGetServices(){
    console.log("testGetUser clicked");
    this.testService.testGetServices().subscribe( data => {
      console.log(data);
    },err=>{
      console.log("error:"+err);
    });
  }
}
