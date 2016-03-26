export function getImagePoster (string) {
	return string ? 'http://123.56.235.156/' + string.split('|')[1] : ''
}

// 用户收费认证状态
export function userStatus (status) {
	return status === 0 ? '未认证' : '已认证'
}