<?php

use yii\db\Migration;

class m161105_142812_Dictionary_Ru extends Migration
{
    public function up()
    {
        $this->createTable('dictionary_ru', [
            'uid' => 'char(36) NOT NULL PRIMARY KEY',
            'value' => 'varchar(255) NOT NULL',
            ], 'CHARACTER SET utf8 COLLATE utf8_general_ci ENGINE=InnoDB');

        $this->createIndex('dic_ru', 'dictionary_ru', 'value', true);
    }

    public function down()
    {
        $this->dropTable('dictionary_ru');
    }
}
