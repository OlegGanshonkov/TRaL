<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;
// Models
use app\models\Literal;

class SiteController extends Controller
{

    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['logout'],
                'rules' => [
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ];
    }

    /**
     * @inheritdoc
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    /**
     * Displays homepage.
     *
     * @return string
     */
    public function actionIndex()
    {
        $literalArr = [
            0 => [
                'value' => 'в',
                'found' => 0
            ],
            1 => [
                'value' => 'е',
                'found' => 0
            ],
            2 => [
                'value' => 'ц',
                'found' => 0
            ],
            3 => [
                'value' => 'ч',
                'found' => 0
            ],
            4 => [
                'value' => 'г',
                'found' => 0
            ],
            5 => [
                'value' => 'у',
                'found' => 0
            ],
            6 => [
                'value' => 'а',
                'found' => 0
            ],
            7 => [
                'value' => 'л',
                'found' => 0
            ],
        ];
        $literalModel = new Literal();
        $literalModel->setRow($literalArr);

        //if (Yii::$app->getRequest()->isAjax) {
        if (Yii::$app->request->isAjax && $literalModel->load(Yii::$app->request->post())) {
            Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
            return \yii\widgets\ActiveForm::validate($literalModel);
        }

        if ($literalModel->load(Yii::$app->request->post()) && $literalModel->validate()) {
            $literalModel->word = '';
            return $this->render('index', [
                    'literalModel' => $literalModel
            ]);
        }

        return $this->render('index', [
                'literalModel' => $literalModel
        ]);
    }

    /**
     * Login action.
     *
     * @return string
     */
    public function actionLogin()
    {
        if (!Yii::$app->user->isGuest) {
            return $this->goHome();
        }

        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post()) && $model->login()) {
            return $this->goBack();
        }
        return $this->render('login', [
                'model' => $model,
        ]);
    }

    /**
     * Logout action.
     *
     * @return string
     */
    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }

    /**
     * Displays contact page.
     *
     * @return string
     */
    public function actionContact()
    {
        $model = new ContactForm();
        if ($model->load(Yii::$app->request->post()) && $model->contact(Yii::$app->params['adminEmail'])) {
            Yii::$app->session->setFlash('contactFormSubmitted');

            return $this->refresh();
        }
        return $this->render('contact', [
                'model' => $model,
        ]);
    }

    /**
     * Displays about page.
     *
     * @return string
     */
    public function actionAbout()
    {
        return $this->render('about');
    }

}