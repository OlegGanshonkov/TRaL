<?php
/* @var $this yii\web\View */
?>


<div class="literal_row">
    <?php if ($literalModel->row): ?>
        <?php foreach ($literalModel->row as $row): ?>
            <?php foreach ($row as $key => $item): ?>
                <div class="literal <?php if ($item['found']): ?> found<?php endif; ?>"><?= $item['value']; ?></div>
            <?php endforeach; ?>
        <?php endforeach; ?>
    <?php endif; ?>
</div>