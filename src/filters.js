export function getImagePoster (string) {
	return string ? 'http://123.56.235.156/' + string.split('|')[1] : ''
}

export function banner(string) {
	return string ? 'http://123.56.235.156/' + string : ''
}

// 用户收费认证状态
export function userStatus (status) {
	return status === 0 ? '未认证' : '已认证'
}