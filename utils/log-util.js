
// 支付成功统计
export const logPayTrace = (traceData) => {
    try {
        if (typeof _qla != 'undefined') {
            _qla('event', {
                category: 'wechatPay',
                action:'success',
                business_id: traceData.id,
                business_type: traceData.type,
                business_pay_type: traceData.payType,
                trace_page: window.sessionStorage && window.sessionStorage.getItem('trace_page') || '',
            });
        }
  } catch (error) {
      console.log(error);
  }
}

export const logGroupTrace = (traceData) => {
    try {
        if (typeof _qla != 'undefined') {
            _qla('event', {
                category: 'countGroup',
                action:'success',
                business_id: traceData.id,
                business_type: traceData.type,
                trace_page: window.sessionStorage && window.sessionStorage.getItem('trace_page') || '',
            });
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * 事件日志打印共用方法
 * @param  {} data    要打印的日志参数（传对象）
 * @param  {[type]} logType 日志类型，默认为事件日志（'event')
 * @return {[type]}         [description]
 */
export const eventLog = (data) => {
    try {
        if (typeof _qla != 'undefined' && typeof data === 'object') {
            /*
            type: 'POST',
    //         url: '/api/wechat/activity/log/increase',
    //         data: { type: type },
            
            */
           _qla('event', {...data, trace_page: window.sessionStorage && window.sessionStorage.getItem('trace_page') || '',});
        }
    } catch (error) {
        console.log(error);
    }
}

export const pageLogPv = (data) => {
    setTimeout(() => {
        typeof _qla != 'undefined' && _qla('pv', {

        });
    }, 0);
}