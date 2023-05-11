import { ref } from 'vue'

export function useCountDown() {
  interface StartCountDownParams {
    time?: number
    speed?: number
    endCallback?: Function
    callback?: Function
  }

  let countDown = ref(0)

  const startCountDown = ({
    time = 60,
    speed = 1000,
    callback = () => {},
    endCallback = () => {}
  }: StartCountDownParams = {}) => {
    if (countDown.value) return // 防止重复点击
    countDown.value = time
    subTimeout(speed)

    function subTimeout(speed: number) {
      const timeId = setTimeout(() => {
        if (countDown.value > 0) {
          countDown.value--
          callback(countDown.value)
          subTimeout(speed)
        } else {
          clearTimeout(timeId)
          endCallback()
        }
      }, speed)
    }
  }

  return { countDown, startCountDown }
}
