export function getImagePoster (string) {
	if(!string)
		return ''
	var arr = string.split('|').filter(function (img) {
		return img
	})
	return arr[0]
}

export function getThumbImagePoster (string) {
	return "/resize_210x210"+string;
}
export function getBannerImagePoster(string) {
	return "/resize_640x350"+string;
}
export function getBannerRightImagePoster(string) {
	return "/resize_360x148"+string;
}

export function banner(string) {
	return string ? 'http://123.56.235.156/resize_640x350/' + string : ''
}

// 用户收费认证状态
export function userStatus (status) {
	return status === 0 ? '未认证' : '已认证'
}