<?php
$ROOT_PATH = "/home/xiaohui/lianmeng/";
$QCMS_PATH = "/home/q/server/qcms/tui2/";
$EXCEPTION = true;
$LOG_PATH  = $ROOT_PATH.'logs/';
$DB_CONF = array(
    'dsn' =>'mysql:host=127.0.0.1;dbname=lianmeng;port=3306',
    'user'=>'lvxiang',
    'pass'=>'lvxiang'
);
$S3_CONF = array(
	'host'   => '218.30.118.198',
	'bucket' => 'XT_Test0',
	'appid'  => 'test',
	'secret' => 'shadu_pass'
);
$SVR_CONF = array(
	'host'  => '10.16.15.124',
	'domain'=> 'xh.stat.corp.qihoo.net',
	#'domain'=> 'fyc.stats.zhushou.corp.qihoo.net',
	'port'  => '80'
);
$PDF_CONF = array(
	'host'  => '10.16.15.124',
	'domain'=> 'lcl.contract.np.add.corp.qihoo.net',
	'port'  => '80'
);
?>