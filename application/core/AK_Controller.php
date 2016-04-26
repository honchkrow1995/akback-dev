<?php

/**
 * Created by PhpStorm.
 * User: carlosrenato
 * Date: 04-25-16
 * Time: 05:49 PM
 */
class AK_Controller extends \CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        // It can be auto-loaded
        $this->load->helper(array('form', 'url'));
        $this->load->library('session');
        $this->load->model('backoffice_model');
    }

    /**
     * Helpers..
     */
    function displaystore(){
        $storeid = $this->session->userdata("storeunique");
        $storename = $this->backoffice_model->stores($storeid);
        return $storename;
    }

}