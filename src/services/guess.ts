import { http } from "@/utils/http"
import type { GuessItem, PageParams, PageResult } from "@/types/global"

export const getGuessApi = (data?: PageParams) => {
    return http<PageResult<GuessItem>>({
        url: '/home/goods/guessLike',
        method: 'GET',
        data
    })
}


