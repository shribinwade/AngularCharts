import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from './common-service.service';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private commonservice:CommonServiceService){}
 
 charttype:any='line';
 years:any;
 filterplayersData:any;
 chart:any;
 data:any;

 lessThenOrGreaterThan:any="greaterthan";
 filterLimit = 0;

 applyFilter(value:any){
  if(this.lessThenOrGreaterThan==="greaterthan"){
    this.filterplayersData = this.data.map((player:any)=>({
      label: player.name,
      data : player.stats.map((stat:any) => {
        if(stat.value>=value){
        return stat.value}})
    }))
  }
  if(this.lessThenOrGreaterThan==="lessthan"){
    this.filterplayersData = this.data.map((player:any)=>({
      label: player.name,
      data : player.stats.map((stat:any) => {
        if(stat.value<=value){
        return stat.value}})
    }))
  }
  
  
  this.updateChart(this.years[0],this.filterplayersData)
}

updateChart(updatedyear:any, updatedData:any){
  this.chart.data.labels = updatedyear;
  this.chart.data.datasets = updatedData;
  // console.log(updatedData);
  console.log(this.charttype);
  
  this.chart.config.type = this.charttype;
  
  this.chart.update();
}


  ngOnInit(): void {
    this.getData().subscribe(data => {
          this.data=data;
          const year = data.map((player:any)=> player.stats.map((stat:any) => stat.year))
          this.years= year;
          const playersData = data.map((player:any)=>({
            label: player.name,
            data : player.stats.map((stat:any) => stat.value)
          }))
          this.filterplayersData=playersData;
         
          this.createChart(year[0],playersData);
    });
  }
  

  getData():Observable<any>{
    return this.commonservice.getserviceData();
  }


  createChart(year: any, playersData: any) {
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: year, 
	      datasets: playersData
        
        
      },
      options: {
        responsive: true,
        aspectRatio:2.5,
        plugins:{
          title: {
          display: true,
          text: 'ODI Career Chart'
        }
      },
      
    }
    });
  }


}
