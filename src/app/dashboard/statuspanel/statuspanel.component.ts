import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { SystemService } from  '../../service/system.service';

@Component({
  selector: 'app-statuspanel',
  templateUrl: './statuspanel.component.html',
  styleUrls: ['./statuspanel.component.scss'],
})
export class StatusPanelComponent implements OnInit {
  clsName="StatusPanelComponent ";
  servicesLoaded=false;
  diskUsageLoaded=false;
  emailUsageLoaded=false;
  mailboxes="0";
  domains="0";
  usedSize="";
  freeSize="";
  serviceStatus=Array();
  statisticData=Array();
  @Output() showMessage = new EventEmitter<any>();
  
  
  constructor(private systemService: SystemService) { 
    this.serviceStatus["postfix"]=-1;
    this.serviceStatus["dovecot"]=-1;
    this.serviceStatus["saslauthd"]=-1;
    this.serviceStatus["postgresql"]=-1;
  }

  ngOnInit() {
    this.servicesLoaded=false;
    this.diskUsageLoaded=false;
    this.emailUsageLoaded=false;
    this.systemService.getSystemServices().subscribe( data => {
      if(!data["error"]){
        let i=0;
        let arr=<Array<any>>data;
        for(i=0;i<arr.length;i++){
          let service=arr[i];
          if(service.error){
            this.serviceStatus[arr[i].name]=1;
          }
          else{
            this.serviceStatus[arr[i].name]=0;
          }
        }
        this.servicesLoaded=true;
      }
      console.log(this.clsName+"[ngOnInit] getSystemServices "+"data:"+JSON.stringify(data));
    },err=>{
      console.log(this.clsName+"[ngOnInit] getSystemServices "+"error:"+err);
    });
    
    this.systemService.getDiskUsage().subscribe( data => {
      if(!data["error"]){
        this.usedSize=this.getSizeString(data["result"]["folderSize"]);
        this.freeSize=this.getSizeString(data["result"]["totalFree"]);
      }
      this.diskUsageLoaded=true;
      console.log(this.clsName+"[ngOnInit] getDiskUsage "+"data:"+JSON.stringify(data));
    },err=>{
      console.log(this.clsName+"[ngOnInit] getDiskUsage "+"error:"+err);
    });
    
    this.systemService.getEmailUsage().subscribe( data => {
      if(!data["error"]){
        this.domains=data["result"]["domains"];
        this.mailboxes=data["result"]["mailboxes"];
        console.log(this.clsName+"[ngOnInit] result:"+data["result"]);
        console.log(this.clsName+"[ngOnInit] domains:"+this.domains);
        console.log(this.clsName+"[ngOnInit] mailboxes:"+this.mailboxes);
      }
      this.emailUsageLoaded=true;
      console.log(this.clsName+"[ngOnInit] getEmailUsage "+"data:"+JSON.stringify(data));
    },err=>{
      console.log(this.clsName+"[ngOnInit] getEmailUsage "+"error:"+err);
    });
  }
  
  restartService(name:string){
    console.log(this.clsName+"[restartService] "+"restartService called");
    this.systemService.restartService(name).subscribe( data => {
      if(!data["error"]){
        this.showMessage.emit({code:200,message:"Service "+name+" restarted successfully."});
      }
      else{
        this.showMessage.emit({code:500,error:"Service failed to restart, error:"+data["error"].toString()});
      }
      console.log(this.clsName+"[restartService] "+"data:"+JSON.stringify(data));
    },err=>{
      this.showMessage.emit({code:500,error:"Service "+name+" failed to restart, error:"+err.toString()});
      console.log(this.clsName+"[restartService] "+"error:"+err);
    });
  }
  
  ngAfterViewInit() {
    (document.querySelector('app-statuspanel') as HTMLElement).style.display = 'inline-block';
    (document.querySelector('app-statuspanel') as HTMLElement).style.position = 'absolute';
    (document.querySelector('app-statuspanel') as HTMLElement).style.width = 'calc( 100% - 240px)';
  }

  getSizeString(size:number){
    if(size>1024*1024*1024)
      return (size/1024/1024/1024).toFixed()+" GB";
    else if(size>1024*1024)
      return (size/1024/1024).toFixed()+" MB";
    else if(size>1024)
      return (size/1024).toFixed()+" KB";
    else
      return size+" bytes";
      
  }
}


