<?php
/* @var $this yii\web\View */

$this->registerJsFile('@web/js/app.js', ['depends' => [\yii\web\JqueryAsset::className()]]);

// Yii
use yii\helpers\Html;
use yii\bootstrap\ActiveForm;
?>
<div>
    <?php
    $form = ActiveForm::begin([
            'id' => 'app-form',
            'enableAjaxValidation' => true,
            'validateOnBlur' => false,
            'validateOnChange' => false
    ]);
    ?>

    <?= $form->field($literalModel, 'word')->textInput(['autofocus' => true])->label(false); ?>
    <div class="hidden">
        <?= $form->field($literalModel, 'currentRow')->hiddenInput(['value' => 0])->label(false); ?>
    </div>

    <div class="form-group">
        <?= Html::submitButton('Submit', ['class' => 'btn btn-primary', 'name' => 'contact-button']) ?>
    </div>

    <?php ActiveForm::end(); ?>
</div>

<?php /*
  <pre>
  <?php print_r($literalModel); ?>
  </pre>
 * 
 */
?>