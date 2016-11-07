<?php
/* @var $this yii\web\View */

$this->title = 'My Yii Application';
?>
<div class="site-index">

    <div id="app">
        <noscript>&lt;h1&gt;У вас отключен JavaScript!&lt;/h1&gt; Чтобы увидеть эту страницу необходимо включить JavaScript.</noscript>
        <div class="app-head">
            <div class="item money">
                <div class="img"><img title="<?= Yii::t('app/head', 'Money') ?>" height="60" src="<?= Yii::$app->params['img'] ?>app/head/money.png" /></div>
                <div class="value"><div>1000</div></div>
                <?php /* <div class="add"><img height="60"  src="<?= Yii::$app->params['img'] ?>app/head/add.png" /></div> */ ?>
            </div>
            <div class="item life">
                <div class="img"><img title="<?= Yii::t('app/head', 'Life') ?>" height="60" src="<?= Yii::$app->params['img'] ?>app/head/infinity.png" /></div>
                <div class="value"><div>10</div></div>
            </div>
            <div class="item lang">
                <div class="img"><img title="<?= Yii::t('app/head', 'Language') ?>" height="60" src="<?= Yii::$app->params['img'] ?>app/head/globus.png" /></div>
                <div class="value"><div>Русский</div></div>
            </div>
            <div class="item help">
                <div class="img"><img title="<?= Yii::t('app/head', 'Help') ?>" height="60" src="<?= Yii::$app->params['img'] ?>app/head/help.png" /></div>
                <div class="value"><div>Помощь</div></div>
            </div>
        </div>
        <div class="app-fields-wrap">
            <div class="app-info-1">
                <div class="target">
                    <h2><?= Yii::t('app/app-info-1', 'Target') ?>:</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                    <p>Lorem ipsum х 24</p>
                    <p>Lorem ipsum х 6</p>
                </div>
                <div class="score">
                    <h2><?= Yii::t('app/app-info-1', 'Score') ?>:</h2>
                    <p><b>564</b></p>
                </div>
            </div>
            <div class="app-field">
                <div class="app-field-in">
                    <div id="field0">
                        <?=
                        $this->render('app/_playing_field', [
                            'literalModel' => $literalModel
                        ])
                        ?>
                    </div>
                </div>
            </div>
            <div class="app-info-2">
                <div class="app-progress">
                    <h2><?= Yii::t('app/app-info-2', 'Progress') ?>:</h2>
                    <p><b>25</b></p>
                </div>
                <div class="powerups">
                    <h2><?= Yii::t('app/app-info-2', 'Powerups') ?>:</h2>
                    <div class="items">
                        <div><img title="<?= Yii::t('app/app-info-2', 'Power up') ?>" height="60" src="<?= Yii::$app->params['img'] ?>app/app-info-2/item01.png" /></div>
                        <div><img title="<?= Yii::t('app/app-info-2', 'Power up') ?>" height="60" src="<?= Yii::$app->params['img'] ?>app/app-info-2/item02.png" /></div>
                        <div><img title="<?= Yii::t('app/app-info-2', 'Power up') ?>" height="60" src="<?= Yii::$app->params['img'] ?>app/app-info-2/item03.png" /></div>
                        <div><img title="<?= Yii::t('app/app-info-2', 'Power up') ?>" height="60" src="<?= Yii::$app->params['img'] ?>app/app-info-2/item04.png" /></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="app-form">
            <?=
            $this->render('app/_form', [
                'literalModel' => $literalModel
            ])
            ?>
        </div>
        <div class="app-info-3">
            <img title="<?= Yii::t('app/app-info-3', 'Logo') ?>" height="60" src="<?= Yii::$app->params['img'] ?>app/app-info-3/logo.png" />
            <div class="app-name"><h1><?= Yii::t('app/app-info-3', 'Logo') ?></h1></div>
            <div class="peoples">
                <img title="<?= Yii::t('app/app-info-3', 'Logo') ?>" src="<?= Yii::$app->params['img'] ?>app/app-info-3/peoples.png" />
            </div>
        </div>
    </div>


    <div class="body-content">

        <div class="row">

        </div>

    </div>
</div>
