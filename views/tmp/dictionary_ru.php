<?php

set_time_limit(0);

$this->title = 'My Yii Application';
use app\models\dictionary\DictionaryRu;
use yii\helpers\Html;
?>
<?php
$dictionary = file_get_contents(Yii::getAlias('@app').'/web/img/dictonary_test1.conf');

$subject = $dictionary;
$pattern = '/\n([А-Я]){2,}[\,]+/u'; //|[A-Z]
preg_match_all($pattern, $subject, $matches, PREG_PATTERN_ORDER);

foreach ($matches[0] as $key => $item) {
    $str = rtrim($item, ',');
    $str = trim(mb_strtolower($str));
    $dictionaryRuOld = DictionaryRu::findOne(['value' => $str]);
    if (!@empty($dictionaryRuOld)) {
        continue;
    }
    
    $dictionaryRu = new DictionaryRu();
    $dictionaryRu->value = Html::encode($str);
    if(!$dictionaryRu->save()) {
        echo $str . ' | ';
    } 
}

echo "<br>";
echo "<br>";
echo "ok";
die;

?>
