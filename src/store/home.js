import { observable, action } from 'mobx'
import moment from 'moment'

const week = {'1':'（周一）','2':'（周二）','3':'（周三）','4':'（周四）','5':'（周五）','6':'（周六）','7':'（周日）'}

class Home {
  @observable selectDate = [] // 选择日期
  @observable selectTime = [] // 选择具体时间
  @observable deliverTime = 0 // 配送时间（展示用）

  // 初始化配送时间
  @action
  handleInitDatePicker = () => {
    const currentDate = new Date()
    const todayEndDate = new Date(`${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()} 20:00`).getTime()

    // 判断当前时间是否在今晚8点以后，明日7点30分以前，左边栏只展示”明日“
    const tomorrowStartDate = new Date(`${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()+1} 7:30`).getTime()
    let isOnlyTomorrow = ((currentDate.getTime() + 1800000) > todayEndDate && currentDate.getTime() < tomorrowStartDate)
    if(isOnlyTomorrow){
      this.selectDate = [{id:1, label:`明日${week[moment().add(1, 'd').format('E')]}`, isActive: true}]
      this.deliverTime = tomorrowStartDate
      this.handleSetTime(1)
    }else{
      this.selectDate = [{id:0, label:`今日${week[moment().format('E')]}`, isActive: true},{id:1, label:`明日${week[moment().add(1, 'd').format('E')]}`, isActive: false}]
      this.deliverTime = moment().add(35, 'm')
      this.handleSetTime(0)
    }
  }

  @action
  handleSetTime = (id) => {
    const currentDate = new Date()
    const isSelectToday = (id == 0 ? 0 : 1)
    let startDate = new Date(`${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()+isSelectToday} 07:00`).getTime()
    let selectTime = []
    for(let i=0; i<26; i++){
      // 往后推迟30分钟
      startDate += 1800000
      if((currentDate.getTime() + 3600000) <= startDate){
        selectTime.push({
          id: i,
          timestamp: startDate,
          label: moment(startDate).format('HH:mm'),
          isActive: false
        })
      }
    }
    this.selectTime = selectTime
  }

  // 选择左边日期
  @action
  handleSelectDate = id => {
    let newSelectDate = this.selectDate.slice()  
    for(let i of newSelectDate){
      if(i.id == id){
        i.isActive = true
      }else{
        i.isActive = false
      }
    }
    this.selectDate = newSelectDate
    this.handleSetTime(id)
  }

  // 选择右边具体时间
  @action
  handleSelectTime = id => {
    let newSelectTime = this.selectTime.slice()
    for (let i of newSelectTime){
      if(i.id == id){
        i.isActive=true
        this.deliverTime = i.timestamp
      }else{
        i.isActive=false
      }
    }
    this.selectTime = newSelectTime
  }
}

export default new Home()