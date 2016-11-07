<?php

namespace app\models\dictionary;

use Yii;

/**
 * DictionaryRu - русский словарь
 */
class DictionaryRu extends Dictionary
{

    public static function tableName()
    {
        return 'dictionary_ru';
    }

    /**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [
            ['value', 'required'],
        ];
    }

    /**
     * @return array customized attribute labels
     */
    public function attributeLabels()
    {
        return [
            'value' => 'Значение',
        ];
    }
    
    public function GUID()
    {
        return sprintf('%04s%04X%04X-%04X-%04X-%04X-%04X%04X', 'DICT', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535));
    }

}