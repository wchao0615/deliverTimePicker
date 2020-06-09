import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import moment from 'moment'
import './index.scss'

@inject('Home')
@observer
export default class Index extends Component {

  state = {
    isDatePickerOpend: false
  }

  componentWillMount () { 
    // 初始化时间选择器
    this.props.Home.handleInitDatePicker() 
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleOpen = () : any => {
    this.setState({isDatePickerOpend: true})
  }

  handleClose = () : any => {
    this.setState({isDatePickerOpend: false})
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  render () {
    const { isDatePickerOpend } = this.state
    const { selectDate, selectTime, deliverTime, handleSelectDate, handleSelectTime } = this.props.Home
    let isTomorrow = moment().isBefore(deliverTime, 'day') ? '约明日' : '约'
    return (
      <View className='page_container'>
        <View className='card_container'>
          <View className='item' onClick={this.handleOpen}>
            <View className='title'>预计送达时间</View>
            <View className='time'>{`${isTomorrow}${moment(deliverTime).format('HH:mm')}`}送达</View>
          </View>
        </View>
        <AtFloatLayout isOpened={isDatePickerOpend} onClose={this.handleClose} title='选择送达时间'>
          <View className='date_container'>
            <View className='left'>
              {
                selectDate && selectDate.map(date => (
                  <View key={date.id} onClick={() => handleSelectDate(date.id)} className={['item', date.isActive && 'active']}>
                  {date.label}
                  </View>
                ))
              }
            </View>
            <ScrollView
              className='right'
              scroll-y
            >
            {
              selectTime && selectTime.map(time => (
                <View key={time.timestamp} onClick={() => handleSelectTime(time.id)} className={['item', time.isActive && 'active']}>{time.label}（免配送费）</View>
              ))
            }
            </ScrollView>
          </View>
        </AtFloatLayout>
      </View>
    )
  }
}
