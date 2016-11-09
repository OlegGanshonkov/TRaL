<?php
/* @var $this yii\web\View */
?>


<div class="literal_row">
    <?php if ($literalModel->row): ?>
        <?php foreach ($literalModel->row as $row): ?>
            <?php foreach ($row as $key => $item): ?>
                <?php if ($item['found']): ?>
                    <div class="literal ">&#9733;</div>
                <?php else: ?>
                    <div class="literal"><?= $item['value']; ?></div>
                <?php endif; ?>
            <?php endforeach; ?>
        <?php endforeach; ?>
    <?php endif; ?>
</div>
<?php /*
<pre>
<?php

print_r(Yii::$app->session['literalRows']);

?>
</pre>
 * 
 */
?>