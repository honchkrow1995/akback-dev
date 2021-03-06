<?php

/**
 * Created by PhpStorm.
 * User: carlosrenato
 * Date: 07-26-16
 * Time: 05:41 PM
 */
class CustomerCheckin extends AK_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Customer_model', 'customer');
        $this->load->model('User_model', 'user');
    }

    public function setCustomerAsCheckin() {
        $request = $_POST;
        $newId = $this->customer->setCheckin($request);
        if ($newId) {
            $response = [
                'status' => 'success',
                'message' => 'Checked in successfully!',
                'new_id' => $newId
            ];
        } else {
            $response = $this->dbErrorMsg();
        }
        echo json_encode($response);
    }

    public function load_checkedInCustomers($status, $location, $uniquefilter = null) {
        $query = " customer_visit.\"CustomerUnique\" = '{$uniquefilter}' ";
        $customers = $this->customer->getCustomersWithVisits($status, $location, false, $query);
        foreach($customers as $customer) {
            $locationName = $this->customer->getLocationName($customer['LocationUnique']);
            $customer['LocationName'] = !empty($locationName) ? $locationName[0]['Name'] : '';
            $customer['_CheckInDate'] = (!is_null($customer['CheckInDate'])) ? date('m/d/Y h:i:sA', strtotime($customer['CheckInDate'])) : '';
            $customer['_CheckOutDate'] = (!is_null($customer['CheckOutDate'])) ? date('m/d/Y h:i:sA', strtotime($customer['CheckOutDate'])) : '';
            $newCustomers[] = $customer;
        }

        echo json_encode($newCustomers);
    }

    public function load_checkInCustomersByLocation($status, $location) {
        // pagination
        $pageNum = (isset($_GET['pagenum'])) ? $_GET['pagenum'] : 1;
        $perPage = (isset($_GET['pagesize'])) ? $_GET['pagesize'] : 20;

        // Sorting
        $sortData = null;
        if (isset($_GET['sortdatafield']))
        {
            $sortData = [
                'sortdatafield' => $_GET['sortdatafield'],
                'sortorder' => $_GET['sortorder'],
            ];
        }
        // Filtering
        $whereQuery = '';
        if (isset($_GET['filterscount']))
        {
            $filterscount = $_GET['filterscount'];
            if ($filterscount > 0)
            {
                $whereQuery = $this->filterCustomerTable($_GET);
            }
            // *Default showing only checked out customers
            else {
                if ($status == 2 && $location == 0) {
                    $today = date('Y-m-d');
                    $tomorrow = date('Y-m-d H:i:s', strtotime($today . ' +1 day'));
                    $_GET["CheckOutDateoperator"] =  "and";
                    $_GET["filtervalue0"] = $today;
                    $_GET["filtercondition0"] =  "GREATER_THAN_OR_EQUAL";
                    $_GET["filteroperator0"] = "0";
                    $_GET["filterdatafield0"] = "CheckOutDate";
                    $_GET["filtervalue1"] =  $tomorrow;
                    $_GET["filtercondition1"] = "LESS_THAN_OR_EQUAL";
                    $_GET["filteroperator1"] = "0";
                    $_GET["filterdatafield1"]= "CheckOutDate";
                    $_GET["filterscount"] = "2";
                    $whereQuery = $this->filterCustomerTable($_GET);
                }
            }
        }
        $newCustomers = [];
        // Counting
        $total = $this->customer->getCustomersWithVisits($status, $location, true, $whereQuery, null, null, $sortData);
        $customers = $this->customer->getCustomersWithVisits($status, $location, false, $whereQuery, $pageNum, $perPage, $sortData);
        foreach($customers as $customer) {
//            date_default_timezone_set('Pacific/Honolulu');
            $locationName = $this->customer->getLocationName($customer['LocationUnique']);
            $customer['LocationName'] = !empty($locationName) ? $locationName[0]['Name'] : '';
            //------------
            $checkin_exclude = (explode('-', $customer['CheckInDate']));
            if(isset($checkin_exclude[3]))  unset($checkin_exclude[3]);
            $customer['CheckInDate'] = (implode('-', $checkin_exclude));
            $checkout_exclude = (explode('-', $customer['CheckOutDate']));
            if(isset($checkout_exclude[3]))  unset($checkout_exclude[3]);
            $customer['CheckOutDate'] = (implode('-', $checkout_exclude));
            $lv_exclude = (explode('-', $customer['LastVisit']));
            if(isset($lv_exclude[3]))  unset($lv_exclude[3]);
            $customer['LastVisit'] = (implode('-', $lv_exclude));
            //------------
            $customer['_CheckInDate'] = (!is_null($customer['CheckInDate'])) ? date('m/d/Y h:i:sA', strtotime($customer['CheckInDate'])) : '';
            $customer['_CheckOutDate'] = (!is_null($customer['CheckOutDate'])) ? date('m/d/Y h:i:sA', strtotime($customer['CheckOutDate'])) : '';
            $customer['_LastVisit'] = date('M d Y h:iA', strtotime($customer['LastVisit']));
            $newCustomers[] = $customer;
        }

        echo json_encode([
            'Rows' => $newCustomers,
            'TotalRows' => $total
        ]);
    }

    public function total_allCustomers() {
        $parentUnique = (isset($_GET['parent'])) ? $_GET['parent'] : null;
        $formName = (isset($_GET['form'])) ? $_GET['form'] : null;
        echo json_encode([
                'total' => $this->customer->getAllCustomers($parentUnique, $formName, true)
            ]
        );
    }

    private function filterCustomerTable($filterData) {
        $where = null;
        if (!is_null($filterData['filterscount'])) {
            $filterscount = $filterData['filterscount'];

            if ($filterscount > 0) {
                $where = "(";
                $tmpdatafield = "";
                $tmpfilteroperator = "";
                $filterscount = $filterData['filterscount'];
                for ($i = 0; $i < $filterscount; $i++) {
                    // get the filter's value.
                    $filtervalue = $filterData["filtervalue" . $i];
                    // get the filter's condition.
                    $filtercondition = $filterData["filtercondition" . $i];
                    // get the filter's column.
                    $filterdatafield = $filterData["filterdatafield" . $i];
                    // get the filter's operator.
                    $filteroperator = $filterData["filteroperator" . $i];
                    if ($tmpdatafield == "") {
                        $tmpdatafield = $filterdatafield;
                    } else {
                        if ($tmpdatafield <> $filterdatafield) {
                            $where .= ") AND (";
                        } else {
                            if ($tmpdatafield == $filterdatafield) {
                                if ($tmpfilteroperator == 0) {
                                    $where .= " AND ";
                                } else {
                                    $where .= " OR ";
                                }
                            }
                        }
                    }
                    // Build the "WHERE" clause depending on the filter's condition, value and datafield.
                    if ($filterdatafield == 'FirstName')
                        $filterdatafield = "customer_visit\".\"FirstName";
                    if ($filterdatafield == 'LastName')
                        $filterdatafield = "customer_visit\".\"LastName";
                    if ($filterdatafield == 'Unique')
                        $filterdatafield = "customer\".\"Unique";
                    if ($filterdatafield == 'LastVisit') {
                        $filterdatafield = "customer\".\"LastVisit";
                        $filtervalue = date('Y-m-d', strtotime(str_replace('-', '/', $filtervalue)));
                    }
                    if ($filterdatafield == 'CheckInDate') {
                        $filterdatafield = "customer_visit\".\"CheckInDate";
                        $filtervalue = date('Y-m-d', strtotime(str_replace('-', '/', $filtervalue)));
                    }
                    if ($filterdatafield == 'CheckOutDate') {
                        $filterdatafield = "customer_visit\".\"CheckOutDate";
                        $filtervalue = date('Y-m-d', strtotime(str_replace('-', '/', $filtervalue)));
                    }
                    if ($filterdatafield == 'VisitUnique') {
                        $filterdatafield = "customer_visit\".\"Unique";
                    }

                    switch ($filtercondition) {
                        case "CONTAINS":
                            $where .= " LOWER(\"" . $filterdatafield . "\") LIKE LOWER('%" . $filtervalue . "%')";
                            break;
                        case "CONTAINS_CASE_SENSITIVE":
                            $where .= " \"" . $filterdatafield . "\" LIKE '%" . $filtervalue . "%'";
                            break;
                        case "DOES_NOT_CONTAIN":
                            $where .= " LOWER(\"" . $filterdatafield . "\") NOT LIKE LOWER('%" . $filtervalue . "%')";
                            break;
                        case "DOES_NOT_CONTAIN_CASE_SENSITIVE":
                            $where .= " \"" . $filterdatafield . "\" NOT LIKE '%" . $filtervalue . "%'";
                            break;
                        case "EQUAL":
                            $where .= " LOWER(\"" . $filterdatafield . "\") = LOWER('" . $filtervalue . "')";
                            break;
                        case "EQUAL_CASE_SENSITIVE":
                            $where .= " \"" . $filterdatafield . "\" = '" . $filtervalue . "'";
                            break;
                        case "NOT_EQUAL":
                            $where .= " \"" . $filterdatafield . "\" <> '" . $filtervalue . "'";
                            break;
                        case "GREATER_THAN":
                            $where .= " \"" . $filterdatafield . "\" > '" . $filtervalue . "'";
                            break;
                        case "LESS_THAN":
                            $where .= " \"" . $filterdatafield . "\" < '" . $filtervalue . "'";
                            break;
                        case "GREATER_THAN_OR_EQUAL":
                            if ($filterdatafield == 'LastVisit')
                                $filtervalue = date('Y-m-d', strtotime($filtervalue));
                            $where .= " \"" . $filterdatafield . "\" >= '" . $filtervalue . "'";
                            break;
                        case "LESS_THAN_OR_EQUAL":
                            if ($filterdatafield == 'LastVisit')
                                $filtervalue = date('Y-m-d', strtotime($filtervalue));
                            $where .= " \"". $filterdatafield . "\" <= '" . $filtervalue . "'";
                            break;
                        case "STARTS_WITH":
                            $where .= " LOWER(\"" . $filterdatafield . "\") LIKE LOWER('" . $filtervalue . "%')";
                            break;
                        case "STARTS_WITH_CASE_SENSITIVE":
                            $where .= " \"" . $filterdatafield . "\" LIKE '" . $filtervalue . "%'";
                            break;
                        case "ENDS_WITH":
                            $where .= " LOWER(\"" . $filterdatafield . "\") LIKE ('%" . $filtervalue . "')";
                            break;
                        case "ENDS_WITH_CASE_SENSITIVE":
                            $where .= " \"" . $filterdatafield . "\" LIKE '%" . $filtervalue . "'";
                            break;
                        case "EMPTY":
                            $where .= " \"" . $filterdatafield . "\" = ''";
                            break;
                        case "NOT_EMPTY":
                            $where .= " \"" . $filterdatafield . "\" <> ''";
                            break;
                        case "NULL":
                            $where .= " \"" . $filterdatafield . "\" IS NULL";
                            break;
                        case "NOT_NULL":
                            $where .= " \"" . $filterdatafield . "\" IS NOT NULL";
                            break;
                    }
                    if ($i == $filterscount - 1) {
                        $where .= ")";
                    }
                    $tmpfilteroperator = $filteroperator;
                    $tmpdatafield = $filterdatafield;
                }
            }
        }
        return $where;
    }

    public function updateStatusCheckin($id) {
        $request = $_POST;
        $status = $this->customer->updateCustomerVisit($id, $request);
        if ($status) {
            $response = [
                'status' => 'success',
                'message' => 'Customer visit success!',
//                'status' => $status
            ];
        } else {
            $response = $this->dbErrorMsg();
        }
        echo json_encode($response);

    }

}