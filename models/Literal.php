<?php

namespace app\models;

use Yii;
use yii\base\Model;
// Model
use app\models\dictionary\DictionaryRu;

/**
 * Literal is the model app form.
 */
class Literal extends Model
{
    public $word;
    public $row;
    public $currentRow = 0;
    public $currentDictionary;

    function __construct()
    {
        parent::__construct();

        if (Yii::$app->language == 'ru') {
            $this->currentDictionary = 'app\models\dictionary\DictionaryRu';
            $session = Yii::$app->session;
            if (!isset($session['literalRows'])) {
                $this->createRow();
                $session['literalRows'] = $this->getAllRows();
            } else {
                $arr = $session['literalRows'];
                $this->setRows($arr);
                $this->currentRow = count($arr)-1;
            }
        }
    }

    /**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [
            // name, email, subject and body are required
            //[['word',], 'required'],
            ['word', 'wordExistsInDictionary'],
            ['word', 'literalExists'],
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

    public function wordExistsInDictionary($attribute, $params)
    {
        if (!$this->currentDictionary::findOne(['value' => $this->word])) {
            $this->addError($attribute, Yii::t('model/literal', 'Word does not exist'));
        }
    }

    public function literalExists($attribute, $params)
    {
        $found = 0;
        foreach ($this->row[$this->currentRow] as $key => $item) {
            if (strpos($this->word, $item['value']) !== false) {
                $this->row[$this->currentRow][$key]['found'] = 1;
                $found++;
            }
        }
        if (!$found) {
            $this->addError($attribute, Yii::t('model/literal', 'The word is not the desired letter'));
        }
    }

    public function setRows($arr)
    {
        $this->row = $arr;
    }

    public function setRow($arr)
    {
        if (isset($this->row[$this->currentRow])) {
            $this->currentRow++;
        }
        $this->row[$this->currentRow] = $arr;
    }

    public function getRow()
    {
        if (isset($this->row[$this->currentRow])) {
            return $this->row[$this->currentRow];
        }
    }

    public function createRow()
    {
        $literalArr = [];
        $i = 0;
        while ($i < 8) {
            $literalArr[$i]['value'] = $this->randomLetter();
            $literalArr[$i]['found'] = 0;
            $i++;
        }
        $this->setRow($literalArr);
        Yii::$app->session['literalRows'] = $this->getAllRows();
    }

    /*
     * Generate random letter, strat position from ASCII 
     */

    private function randomLetter()
    {
        $l = chr(224 + mt_rand(0, 31));
        return iconv('CP1251', 'UTF-8', $l);
    }

    public function getAllRows()
    {
        return $this->row;
    }

    /*
     * Check if letters already finded
     * @return true/false
     */

    public function checkAllfind()
    {
        foreach ($this->row[$this->currentRow] as $key => $item) {
            if ($item['found'] == 0) {
                return false;
            } 
        }
        return true;
    }

}