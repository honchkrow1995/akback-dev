<?php

/**
 * Created by PhpStorm.
 * User: carlosrenato
 * Date: 10-24-16
 * Time: 06:57 PM
 */
class ItemController extends AK_Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    public function index() {
        // Data to send
        $data['currentuser'] = $this->session->userdata("currentuser");
        $data['station'] = $this->session->userdata("station_number");
        $data['page_title'] = "Menu Categories";
        $data['storename'] = $this->displaystore();
        $data['decimalsPrice'] = (int)$this->session->userdata("DecimalsPrice");
        $data['decimalsQuantity'] = (int)$this->session->userdata("DecimalsQuantity");
        // Partials Views
        $menu_path = 'backoffice_admin/menu_categories/inventory/';
        $data['inventory_item_subtab_view'] = $menu_path . "item_subtab";
        $data['inventory_cost_subtab_view'] = $menu_path . "cost_subtab";
        $data['inventory_price_subtab_view'] = $menu_path . "price_subtab";
        $data['inventory_stocklevel_subtab_view'] = $menu_path . "stocklevel_subtab";
        $data['inventory_tax_subtab_view'] = $menu_path . "tax_subtab";
        $data['inventory_barcode_subtab_view'] = $menu_path . "barcode_subtab";
        $data['inventory_question_subtab_view'] = $menu_path . "question_subtab";
        $data['inventory_printer_subtab_view'] = $menu_path . "printer_subtab";
        $data['inventory_options_subtab_view'] = $menu_path . "options_subtab";
        $data['inventory_picture_subtab_view'] = $menu_path . "picture_subtab";
        // Main page
        $this->load->view($menu_path . "main", $data);
    }

}