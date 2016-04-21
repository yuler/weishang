export function getImagePoster (string) {
	if(!string)
		return ''
	var arr = string.split('|').filter(function (img) {
		return img
	})
	return arr[0]
}

export function banner(string) {
	return string ? 'http://123.56.235.156/' + string : ''
}

// 用户收费认证状态
export function userStatus (status) {
	return status === 0 ? '未认证' : '已认证'
}