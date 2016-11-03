<?php

namespace app\models;

use Yii;
use yii\base\Model;

/**
 * Literal is the model app form.
 */
class Literal extends Model
{
    public $word;
    public $row;
    public $currentRow = 0;
    public $rowKey = 0;

    /**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [
            // name, email, subject and body are required
            //[['word',], 'required'],
            ['word', 'wordExists'],
        ];
    }

    /**
     * @return array customized attribute labels
     */
    public function attributeLabels()
    {
        return [
            'word' => 'Слово',
        ];
    }

    public function setRow($arr)
    {
        if (isset($this->row[$this->rowKey])) {
            $this->rowKey++;
        }
        $this->row[$this->rowKey] = $arr;
    }

    public function getRow()
    {
        if (isset($this->row[$this->currentRow])) {
            return $this->row[$this->currentRow];
        }
    }

    public function wordExists($attribute, $params)
    {
        //$row = $this->getRow();
        $found = 0;
        foreach ($this->row[$this->currentRow] as $key => $item) {
            if (strpos($this->word, $item['value']) !== false) {
                $found++;
                $this->row[$this->currentRow][$key]['found'] = 1;
            }
        }
        if (!$found) {
            $this->addError($attribute, 'Слово не подходит');
        }
    }

}