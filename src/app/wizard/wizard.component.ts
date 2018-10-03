import { Component, OnInit } from '@angular/core';
import { Wizard } from './wizard';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { WizardService } from  '../service/wizard.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {
  checked=false;
  submitted=false;
  dependencyResult:Array<any>;
  dbTested=-1; //0 testing, //1 ok //2 failed
  dependencyTested=-1;
  wizardFinished=-1;
  wizardForm1: FormGroup;
  wizardForm2: FormGroup;
  wizardForm3: FormGroup;
  wizardForm4: FormGroup;
  wizard: Wizard ;
  
  
  constructor(private router: Router, private formBuilder: FormBuilder, private  wizardService:  WizardService) {
    this.wizard=new Wizard();
  }
  
  private checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey];
      const passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  ngOnInit() {
    this.wizardForm1 = this.formBuilder.group({
        loginName: [this.wizard.loginName, [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        cfmPassword: ['', [Validators.required, Validators.minLength(6)]]
    },{validator: this.checkIfMatchingPasswords('password', 'cfmPassword')});
    
    this.wizardForm2 = this.formBuilder.group({
        dbAddress: ['', [Validators.required]],
        dbUSer: ['', [Validators.required]],
        dbPassword: ['', [Validators.required]],
        dbName: ['', [Validators.required]]
    });
    this.wizardForm3 = this.formBuilder.group({
        emailDomain: ['', [Validators.required]],
        emailUser: ['', [Validators.required]],
        emailPassword: ['', [Validators.required, Validators.minLength(6)]],
        cfmEmailPassword: ['', [Validators.required, Validators.minLength(6)]],
        baseMailFolder:['', [Validators.required]],
        runasuser:['', [Validators.required]],
        sudoPassword:['', [Validators.required]],
    },{validator: this.checkIfMatchingPasswords('emailPassword', 'cfmEmailPassword')});
    
    this.wizardForm4 = this.formBuilder.group({
    });
  }
  
  nextStep(){
    this.submitted = true;
    
    if (this["wizardForm"+this.wizard.step].invalid) {
      return;
    }
    
    for(let keyName in this["wizardForm"+this.wizard.step].controls){
      this.wizard[keyName]=this["wizardForm"+this.wizard.step].controls[keyName].value;
    }
    console.log("submit ok:"+JSON.stringify(this.wizard));
    
    this.submitted = false;
    if(this.wizard.step==4){
      if(this.dependencyTested==1)
        this.finishWizard();
      else
        this.testDependency();
      return;
    }
    this.wizard.step++;
    console.log("next clicked");
    if(this.wizard.step==4){
      this.testDependency();
    }
    
  }
  
  previousStep(){
    
    console.log("previousStep clicked");
    this.wizard.step--;
    
  }
  
  testDBConnection(){
    console.log("testDBConnection");
    this.dbTested=0;
    this.submitted = true;
    
    if (this["wizardForm"+this.wizard.step].invalid) {
      return;
    }
    
    for(let keyName in this["wizardForm"+this.wizard.step].controls){
      this.wizard[keyName]=this["wizardForm"+this.wizard.step].controls[keyName].value;
    }
    console.log(JSON.stringify(this.wizard));
    this.wizardService.testDatabase(this.wizard).subscribe( data => {
      console.log(data);
      if(data["error"])
        this.dbTested=2;
      else
        this.dbTested=1;
    },err=>{
      this.dbTested=2;
      console.log("error:"+err);
    });
  }
  
  testDependency(){
    console.log("testDependency");
    this.dependencyTested=0
    this.wizardService.testDependency(this.wizard).subscribe( data => {
      console.log(data);
      if(Array.isArray(data)){
        this.dependencyResult=data;
      }
      let i=0;
      let error=false;
      console.log(JSON.stringify(data));
      for(i=0;i<this.dependencyResult.length;i++){
        if(this.dependencyResult[i].error){
          this.dependencyTested=2;
          error=true;
          break;
        }
      }
      if(!error)
        this.dependencyTested=1;
    },err=>{
      this.dependencyTested=2;
      console.log("error:"+err);
    });
    
  }
  
  finishWizard(){
    console.log("finishWizard");
    this.wizardFinished=0
    this.wizardService.finishWizard(this.wizard).subscribe( data => {
      console.log(data);
      if(data["code"]==200){
        this.router.navigate(['/login']);
        this.wizardFinished=1;
      }
    },err=>{
      this.wizardFinished=2;
      console.log("error:"+err);
    });
  }
}
