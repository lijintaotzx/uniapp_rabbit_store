import { useMemberStore } from "@/stores"

const baseUrl = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
const httpInterceptor = {
    invoke(options: UniApp.RequestOptions) {
        if (!options.url.startsWith('http')) {
            options.url = baseUrl + options.url
        }
        options.timeout = 10000
        options.header = {
            ...options.header,
            'source-client': 'miniapp'
        }

        const memberStore = useMemberStore()
        const token = memberStore.profile?.token
        if (token) {
            options.header.Authorization = token
        }
    }
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

interface Data<T> {
    code: string,
    msg: string,
    result: T
}
// 封装请求函数
export const http = <T>(options: UniApp.RequestOptions) => {
    return new Promise<Data<T>>((resolve, reject) => {
        uni.request({
            ...options,
            success(result) {
                if (result.statusCode >= 200 && result.statusCode < 300) {
                    // 状态码2xx
                    resolve(result.data as Data<T>)
                } else if (result.statusCode == 401) {
                    const memberStore = useMemberStore()
                    memberStore.clearProfile()
                    uni.navigateTo({
                        url: '/pages/login/login'
                    })
                    reject('token失效了.')
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: (result.data as Data<T>).msg || '请求错误'
                    })
                    reject(result)
                }
            },
            fail(result) {
                console.log('网络错误·111')
                uni.showToast({
                    icon: 'none',
                    title: '网络错误'
                })
                reject(result)
            },
        })
    })
}