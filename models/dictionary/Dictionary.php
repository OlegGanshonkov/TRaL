<?php

namespace app\models\dictionary;

use Yii;
use yii\db\ActiveRecord;

/**
 * Dictionary - общий класс для словарей
 */
class Dictionary extends ActiveRecord
{

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
    
    public function beforeSave($insert)
    {
        if (parent::beforeSave($insert)) {

            if ($this->isNewRecord) {
                
                // create UID for new row
                if (empty($this->uid))
                    $this->uid = $this->GUID();
            }

            return true;
        }
    }
}