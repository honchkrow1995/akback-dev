<?php

class Item_count_model extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
    }

    public function mainList($status) {
        $this->db->select('item_count.*, cl."LocationName",
          cu1."UserName" as "CreatedByName", cu2."UserName" as "UpdatedByName",
          to_char(date_trunc(\'minutes\', item_count."Created"::timestamp), \'MM/DD/YYYY HH:MI AM\') as Created,
          to_char(date_trunc(\'minutes\', item_count."Created"::timestamp), \'MM/DD/YYYY HH:MI AM\')  as "_Created",
          to_char(date_trunc(\'minutes\', item_count."Updated"::timestamp), \'MM/DD/YYYY HH:MI AM\') as Updated,
          to_char(date_trunc(\'minutes\', item_count."Updated"::timestamp), \'MM/DD/YYYY HH:MI AM\')  as "_Updated",
          to_char(date_trunc(\'minutes\', item_count."CountDate"::timestamp), \'MM/DD/YYYY\') as "CountDateFormatted",
          date_trunc(\'minutes\', item_count."CountDate"::timestamp) as "_CountDate",
            case when item_count."Status" = 1 then \'In Progress\'
                 when item_count."Status" = 2 then \'Complete\' 
                 else \'Other\'
            end as "StatusName",
          icf."MainCategory" as "CategoryFilter", icf."SubCategory" as "SubCategoryFilter",
          icf."SupplierUnique" as "SupplierFilter" 
          ', false);
        $this->db->from('item_count');
        $this->db->join('config_location cl', 'cl.Unique = item_count.Location', 'left');
        $this->db->join('config_user cu1', 'cu1.Unique = item_count.CreatedBy', 'left');
        $this->db->join('config_user cu2', 'cu2.Unique = item_count.UpdatedBy', 'left');
        $this->db->join('item_count_filter icf', 'icf.CountUnique = item_count.Unique', 'left');
        if (is_null($status) || empty($status))
        $this->db->where('item_count.Status!=', 0);
        else
        $this->db->where('item_count.Status', $status);
        $this->db->order_by('item_count.Created', 'DESC');
        return $this->db->get()->result_array();
    }

    public function getLists($id, $rowCountListId = null)
    {
        // -- Update dynamic values first before to load all values
        // Difference = CountStock - CurrentStock
        // NewCost = CountStock * TotalCost (sum of 4 type of costs)
        // AdjustedCost = Difference * TotalCost (sum of 4 type of costs)
        //-------------------------
        /**
        $sql = 'update item_count_list
        set "Difference" = "CountStock" - coalesce("CurrentStock",0),
            "NewCost" = "CountStock" * (coalesce("Cost", 0) + coalesce("CostExtra", 0) + coalesce("CostFreight", 0) + coalesce("CostDuty", 0)),
            "AdjustedCost" = ("CountStock" - "CurrentStock") * (coalesce("Cost", 0) + coalesce("CostExtra", 0) + coalesce("CostFreight", 0) + coalesce("CostDuty", 0)) 
        where "Status" != 0 AND "CountUnique" = ' . $id;
        $this->db->query($sql);
        **/
        //-------------------------
        // Current query to get all item_count_list by item_count id selected
        $where = '';
        if (!is_null($id)) {
            $where = " AND icl.\"CountUnique\" = " . $id;
        }
        $orderby = " ORDER BY icl.\"Unique\" DESC";
        //
        $query = "
            SELECT icl.*, ic.\"Location\", cl.\"LocationName\", ic.\"Station\", trim(ic.\"Comment\"),
              ic.\"Location\", ic.\"Status\" as \"StatusCount\",
              cu1.\"UserName\" as CreatedByName, cu2.\"UserName\" as UpdatedByName,
              to_char(date_trunc('minutes', ic.\"Created\"::timestamp), 'MM/DD/YYYY HH:MI AM') as \"Created\",
              to_char(date_trunc('minutes', ic.\"Updated\"::timestamp), 'MM/DD/YYYY HH:MI AM') as \"Updated\",
              (COALESCE (icl.\"Cost\", 0) + COALESCE (icl.\"CostExtra\", 0)
               + COALESCE(icl.\"CostFreight\", 0) + COALESCE(icl.\"CostDuty\", 0))
                as \"TotalCost\"
            FROM item_count ic
            left join item_count_list icl on icl.\"CountUnique\" = ic.\"Unique\"
            left join config_location cl on cl.\"Unique\" = ic.\"Location\"
            left join config_user cu1 on cu1.\"Unique\" = ic.\"CreatedBy\"
            left join config_user cu2 on cu2.\"Unique\" = ic.\"UpdatedBy\"
            WHERE ic.\"Status\" != 0 AND icl.\"Status\" != 0 " . $where . $orderby
        ;

        return $this->db->query($query)->result_array();
    }

    public function create($data, $filters = null, $scanFilename = null) {
        $data['Station'] = $data['Location'];
        $data['Status'] = 1;
        $data['Created'] = date('Y-m-d H:i:s');
        $data['CreatedBy'] = $this->session->userdata('userid');
        $this->db->insert('item_count', $data);
        $id = $this->db->insert_id();
        $this->insert_count_list($id, $data['Location'], $filters);

        if (!is_null($scanFilename) && !empty($scanFilename)) {
            $scanData = [
                'Station' => $this->session->userdata("station_number"),
                'Location' => $data['Location'],
                'Comment' => $data['Comment'],
                'filename' => $scanFilename
            ];
            // TODO pending to store it in case to be linked to item_count table or item_count_scan table
            $scanId = $this->createScan($scanData);
        }

        return [
            'countID' => $id,
            'scanID' => isset($scanId) ? $scanId : ''
        ];
    }

    public function update($id, $data, $scanFilename = null) {
        $data['Updated'] = date('Y-m-d H:i:s');
        $data['UpdatedBy'] = $this->session->userdata('userid');

        $this->db->where('Unique', $id);
        $status =  $this->db->update('item_count', $data);
        if (!is_null($scanFilename) && !empty($scanFilename)) {
            $scanData = [
                'Station' => $this->session->userdata("station_number"),
                'Location' => $data['Location'],
                'Comment' => $data['Comment'],
                'filename' => $scanFilename
            ];
            // TODO pending to store it in case to be linked to item_count table or item_count_scan table
            $scanId = $this->createScan($scanData);
            $this->itemMatchScan($scanId);
        }

        return [
            'status' => $status,
            'scanID' => isset($scanId) ? $scanId : ''
        ];
    }

    public function delete($id) {
        $updated = date('Y-m-d H:i:s');
        $updatedBy = $this->session->userdata('userid');
        // Count list was built?
// $row = $this->db->query("SELECT \"Status\" from item_count where \"Unique\"={$id}")->row_array();
// $countStatus = $row['Status']; // 2 = Finalized
        // Soft Delete item_count table
        $this->db->trans_start();
        $this->db->where('Unique', $id);
        $status = $this->db->update('item_count',
                ['Status' => 0,
                'Updated' => $updated,
                'UpdatedBy' => $updatedBy,
                ]);
        $this->db->trans_complete();
        // Soft Delete item_count_list table
        $this->db->trans_start();
        $this->db->where('CountUnique', $id);
        $this->db->update('item_count_list', [
            'Updated' => $updated,
            'UpdatedBy' => $updatedBy,
            'Status' => 0
            ]);
        $this->db->trans_complete();
        // Soft Delete item_stock_line table
        $this->db->trans_start();
        $from = "from item_count IC
        join item_count_list ICL on IC.\"Unique\" = ICL.\"CountUnique\"
        where ICL.\"CountUnique\" = {$id}
        and ICL.\"CountStock\" is not null";
        $isl = "update item_stock_line
                set \"status\" = 0,
                    \"Updated\" = CURRENT_TIMESTAMP,
                    \"UpdatedBy\" = {$updatedBy}
                from (select ICL.\"Unique\" as id {$from}) as subquery
                where subquery.id = item_stock_line.\"CountUnique\"";
        $this->db->query($isl);
        $this->db->trans_complete();
        // Soft Delete item_count_filter table
        $this->db->trans_start();
        $this->db->where('CountUnique', $id);
        $this->db->update('item_count_filter', [
            'Updated' => $updated,
            'UpdatedBy' => $updatedBy,
            'Status' => 0
        ]);
        $this->db->trans_complete();


        return $status;
    }

    public function insert_count_list($countID, $locationID, $filters = null)    {
        $id = $this->session->userdata('userid');
        //
        $whereInM = $whereInC = $whereInS = '';
        if (!is_null($filters)) {
            if (isset($filters['MainCategory'])) {
                $whereInM .= " AND IT.\"MainCategory\" = ". $filters['MainCategory'];
            }
            if (isset($filters['SubCategory'])) {
                $filters['SubCategory'] = implode(',', $filters['SubCategory']);
                $whereInC .= " AND IT.\"CategoryUnique\" IN (".  $filters['SubCategory'] . ')';
            }
            if (isset($filters['SupplierUnique'])) {
                $filters['SupplierUnique'] = implode(',', $filters['SupplierUnique']);
                $whereInS .= " AND IT.\"SupplierUnique\" IN (". $filters['SupplierUnique'] . ')';
            }
            $this->db->trans_start();
            $filters['Status'] = 1;
            $filters['CountUnique'] = $countID;
            $filters['Created'] = date('Y-m-d H:i:s');
            $filters['CreatedBy'] = $id;
            $this->db->insert('item_count_filter', $filters);
            $this->db->trans_complete();
        }
        $query = "
            insert into item_count_list (\"CountUnique\",\"ItemUnique\",\"Item\",\"Part\",\"Description\",\"Category\",     
                        \"SubCategory\",\"Supplier\",\"SupplierPart\",\"Cost\",
                         \"CurrentStock\",\"CountStock\",\"Difference\",\"NewCost\",\"AdjustedCost\",
                         \"CostExtra\",\"CostFreight\",\"CostDuty\", 
                         \"Status\", \"CreatedBy\")
              (select ". $countID ." as \"CountUnique\", IT.\"Unique\" as \"ItemUnique\", trim(IT.\"Item\") as \"Item\",
               trim(IT.\"Part\") as \"Part\", trim(IT.\"Description\") as \"Description\", 
               trim(CM.\"MainName\") as \"Category\", trim(CS.\"Name\") as \"SubCategory\",
               trim(SU.\"Company\") as \"Supplier\",trim(IT.\"SupplierPart\") as \"SupplierPart\",
               IT.\"Cost\"::numeric as \"Cost\",
               ST.\"CurrentStock\" as \"CurrentStock\", null as \"CountStock\", null as \"Difference\",
               null as \"NewCost\", null as \"AdjustedCost\",
               IT.\"Cost_Extra\"::numeric, IT.\"Cost_Freight\"::numeric, IT.\"Cost_Duty\"::numeric,
               1 as \"Status\", ". $id ." as \"CreatedBy\"
              from item IT
              left join category_main CM on CM.\"Unique\" = IT.\"MainCategory\"
              left join category_sub CS on CS.\"Unique\" = IT.\"CategoryUnique\"
              left join supplier SU on SU.\"Unique\" = IT.\"SupplierUnique\"
              left join 
                (select \"ItemUnique\",sum(\"Quantity\") as \"CurrentStock\" from item_stock_line
                    where \"status\" = 1 and \"LocationUnique\" = ". $locationID ." group by \"ItemUnique\") ST
                on ST.\"ItemUnique\" = IT.\"Unique\"
              where IT.\"Status\" = 1
              ". $whereInM.$whereInC.$whereInS.")
        ";
        return $this->db->query($query);
    }

    public function update_count_list($id, $data) {
        $data['Updated'] = date('Y-m-d H:i:s');
        $data['UpdatedBy'] = $this->session->userdata('userid');
        $status = $this->db->update('item_count_list', $data, ['Unique' => $id]);
        // -- Insert/Update on item_stock_line -- //
        $islData = [];
        $isISL = $this->db->where('CountUnique', $id)
                ->where('status', 1)->get('item_stock_line')->num_rows();
        if (count($isISL) > 0) {
            $islData['Updated'] = date('Y-m-d H:i:s');
            $islData['UpdatedBy'] = $this->session->userdata('userid');
            if (isset($data['Difference']))
                $islData['Quantity'] = $data['Difference'];
            if (isset($data['Comment']))
                $islData['Comment'] = $data['Comment'];
            $this->db->where('CountUnique', $id);
            $this->db->update('item_stock_line', $islData);
        } else {
            if (isset($data['Status']) && $data['Status'] == 2) {
                // Making sure that isl rows exists for current
                $select = "select ICL.\"ItemUnique\",IC.\"Location\" as \"LocationUnique\", 1 as \"Type\", ICL.\"Difference\" as \"Quantity\",
                ICL.\"CreatedBy\" as \"CreatedBy\", now() as \"Created\", IC.\"CountDate\" as \"TransactionDate\",
                ICL.\"Comment\" as \"Comment\", 
                IC.\"CountDate\"::date as \"trans_date\", 
                1 as \"status\", ICL.\"Unique\" as \"CountUnique\",
                (ICL.\"Cost\" + ICL.\"CostExtra\" + ICL.\"CostFreight\" + ICL.\"CostDuty\") as \"unit_cost\",
                ICL.\"Cost\" as \"Cost\", ICL.\"CostExtra\" as \"CostExtra\",
                ICL.\"CostFreight\" as \"CostFreight\", ICL.\"CostDuty\" as \"CostDuty\",
                ICL.\"CountUnique\" as \"TransID\"
                 from item_count IC 
                join item_count_list ICL on IC.\"Unique\" = ICL.\"CountUnique\" 
                where ICL.\"Unique\" = {$id} AND ICL.\"Status\" = 2";
                    $sql = "(". $select . ")";
                    $insert = "insert into item_stock_line(\"ItemUnique\",\"LocationUnique\",\"Type\",\"Quantity\",\"CreatedBy\",     
                        \"Created\",\"TransactionDate\",\"Comment\",\"trans_date\", \"status\", \"CountUnique\",
                        \"unit_cost\", \"Cost\", \"CostExtra\", \"CostFreight\",\"CostDuty\",\"TransID\") " . $sql;
                $this->db->query($insert);
            }
        }

        return $status;
    }

    public function delete_count_list($ids) {
        $ids = explode(',', $ids);
        $data['Updated'] = date('Y-m-d H:i:s');
        $data['UpdatedBy'] = $this->session->userdata('userid');
        $data['Status'] = 0;
        $this->db->trans_start();
        $this->db->where_in('Unique', $ids);
        $status = $this->db->update('item_count_list', $data);
        $this->db->trans_complete();
        // Delete item_stock_line registered
        $data['status'] = 0;
        unset($data['Status']);
        $this->db->trans_start();
        $this->db->where_in('CountUnique', $ids);
        $this->db->update('item_stock_line', $data);
        $this->db->trans_complete();
        return $status;
    }

    public function finalize_count_list($countID) {
        // TODO missing ICL."Cost" as "Cost", after TransactionDate
        $select = "select ICL.\"ItemUnique\",IC.\"Location\" as \"LocationUnique\", 1 as \"Type\", ICL.\"Difference\" as \"Quantity\",
            ICL.\"CreatedBy\" as \"CreatedBy\", now() as \"Created\", IC.\"CountDate\" as \"TransactionDate\",
            ICL.\"Comment\" as \"Comment\", 
            IC.\"CountDate\"::date as \"trans_date\", 
            1 as \"status\", ICL.\"Unique\" as \"CountUnique\",
            (ICL.\"Cost\" + ICL.\"CostExtra\" + ICL.\"CostFreight\" + ICL.\"CostDuty\") as \"unit_cost\",
            ICL.\"Cost\" as \"Cost\", ICL.\"CostExtra\" as \"CostExtra\",
            ICL.\"CostFreight\" as \"CostFreight\", ICL.\"CostDuty\" as \"CostDuty\",
            ICL.\"CountUnique\" as \"TransID\" 
            ";
        $from = " from item_count IC 
            join item_count_list ICL on IC.\"Unique\" = ICL.\"CountUnique\" 
            where ICL.\"CountUnique\" = {$countID}
            and ICL.\"CountStock\" is not null"; // and "Difference" is not null
        //
        $sql = "(". $select . $from . ")";
        $insert = "insert into item_stock_line(\"ItemUnique\",\"LocationUnique\",\"Type\",\"Quantity\",\"CreatedBy\",     
                    \"Created\",\"TransactionDate\",\"Comment\",\"trans_date\", \"status\", \"CountUnique\",
                    \"unit_cost\", \"Cost\", \"CostExtra\", \"CostFreight\",\"CostDuty\",\"TransID\") " . $sql;
        // Insert into item_stock_line
        $this->db->trans_start();
        $status = $this->db->query($insert);
        $this->db->trans_complete();
        if ($status) {
            // Update Status on Count list item
            $this->db->trans_start();
            $this->db->update('item_count', ['Status' => 2,
                'Updated' => date('Y-m-d H:i:s'),
                'UpdatedBy' => $this->session->userdata('userid'),
            ], ['Unique' => $countID]);
            $this->db->trans_complete();
            // Update Status on Count list item
            $icl = 'select isl."Unique" as id, isl."CountUnique" as countid from item_stock_line isl
                    where isl."CountUnique" in (select ICL."Unique"' . $from. ")";
            $ids = $this->db->query($icl)->result_array();
            foreach ($ids as $row) {
                $this->db->trans_start();
                $this->db->update('item_count_list',
                    ['Status' => 2 , 'ItemStockLineUnique' => $row['id']],
                    ['Unique' => $row['countid']]);
//                $this->db->update('item_count_list',
//                    ['Status' => 2 ],
//                    ['CountUnique' => $countID]);
                $this->db->trans_complete();
            }
        }

        return $status;
    }

    public function setZero_NotCounted_list($id) {
        $query = "UPDATE item_count_list
                    SET  \"CountStock\" = 0, \"Difference\" = (0 - \"CurrentStock\"),
                          \"AdjustedCost\"=0, \"NewCost\"=0
                    WHERE \"CountStock\" is NULL AND \"CountUnique\" = {$id}";
        return $this->db->query($query);
    }

    public function setZero_AllList($id) {
        $query = 'UPDATE item_count_list
                    SET  "CountStock" = 0, "Difference" = (0 - coalesce("CurrentStock", 0)),
                         "NewCost" = 0, 
                         "AdjustedCost" = (0 - coalesce("CurrentStock", 0)) * (coalesce("Cost", 0) + coalesce("CostExtra", 0) + coalesce("CostFreight", 0) + coalesce("CostDuty", 0))
                    WHERE "CountUnique" = ' . $id;
        return $this->db->query($query);
    }

    /**
     * ITEM COUNT SCAN
     */
    public function itemCountScan($status = '', $orderby = null) {
        $this->db->select('item_count_scan.*, cl."LocationName",
          array_to_string(array(
            select "ImportFile"
            from item_count_scan_list
            where "CountScanUnique" = item_count_scan."Unique"
            GROUP BY "ImportFile"
            ORDER BY "ImportFile"
            ), \',\'
          ) as "FilesImported",
          cu1."UserName" as "CreatedByName", cu2."UserName" as "UpdatedByName",
          to_char(item_count_scan."Created"::timestamp, \'MM-DD-YYYY HH12:MI AM\') as "_nCreated",
          to_char(date_trunc(\'minutes\', item_count_scan."Created"::timestamp), \'MM/DD/YYYY HH:MI AM\') as "Created",
          to_char(date_trunc(\'minutes\', item_count_scan."Updated"::timestamp), \'MM/DD/YYYY HH:MI AM\') as "Updated",
          ', false);
        $this->db->from('item_count_scan');
        $this->db->join('config_location cl', 'cl.Unique = item_count_scan.Location', 'left');
        $this->db->join('config_user cu1', 'cu1.Unique = item_count_scan.CreatedBy', 'left');
        $this->db->join('config_user cu2', 'cu2.Unique = item_count_scan.UpdatedBy', 'left');
//        $this->db->where('item_count_scan.Status!=', 0);
        if (!empty($status))
            $this->db->where('item_count_scan.Status', $status);
        else
            $this->db->where('item_count_scan.Status!=', 0);
        if (!is_null($orderby)) {
            $this->db->order_by($orderby);
        } else {
            $this->db->order_by('item_count_scan.Created', 'DESC');
        }
        return $this->db->get()->result_array();
    }

    public function itemCountScanList($id) {
        $this->db->select('item_count_scan_list.*,
          cu1."UserName" as "CreatedByName", cu2."UserName" as "UpdatedByName",
          to_char(date_trunc(\'minutes\', item_count_scan_list."Created"::timestamp), \'MM/DD/YYYY HH:MI AM\') as Created,
          to_char(date_trunc(\'minutes\', item_count_scan_list."Updated"::timestamp), \'MM/DD/YYYY HH:MI AM\') as Updated,
          ', false);
        $this->db->from('item_count_scan_list');
        $this->db->join('config_user cu1', 'cu1.Unique = item_count_scan_list.CreatedBy', 'left');
        $this->db->join('config_user cu2', 'cu2.Unique = item_count_scan_list.UpdatedBy', 'left');
        $this->db->where('item_count_scan_list.Status!=', 0);
        $this->db->where('item_count_scan_list.CountScanUnique', $id);
        $this->db->order_by('item_count_scan_list.Unique, item_count_scan_list.Created', 'DESC');
        return $this->db->get()->result_array();
    }

    public function getScanListInCount($scanUnique) {
        $this->db->where('CountScanUnique', $scanUnique);
        $this->db->where('Status', 1);
        $this->db->where('ItemUnique!=', null);
        $this->db->order_by('Description ASC');
        return $this->db->get('item_count_scan_list')->result_array();
    }

    public function addToCountSelectedScan($countID, $scanSelected = null) {
        $current = $this->session->userdata('userid');
        // ITEM == 8888769
        $sql = 'update item_count_list
        set "CountStock" = a."Quantity" + coalesce("CountStock",0), "Updated" = now(), "UpdatedBy" ='. $current . ',
            "NewCost" = (a."Quantity" + coalesce("CountStock", 0)) * (coalesce("Cost", 0) + coalesce("CostExtra", 0) + coalesce("CostFreight", 0) + coalesce("CostDuty", 0)),
            "AdjustedCost" = ((a."Quantity" + coalesce("CountStock",0)) - coalesce("CurrentStock", 0)) * (coalesce("Cost", 0) + coalesce("CostExtra", 0) + coalesce("CostFreight", 0) + coalesce("CostDuty", 0)) 
        from
          (select "ItemUnique", sum(coalesce("Quantity", 0)) as "Quantity"
           from item_count_scan_list
           where "Status" = 1 and "CountScanUnique" = ' . $scanSelected . '
           group by "ItemUnique") a
        where item_count_list."ItemUnique" = a."ItemUnique"
        and item_count_list."CountUnique" = ' . $countID;

        return $this->db->query($sql);
    }

    public function closeScanFileToImport($scanSelected) {
        return $this->db->update('item_count_scan',
            ['Status' => 2,
            'Updated' => date('Y-m-d H:i:s'),
            'UpdatedBy' => $this->session->userdata('userid')
            ],
            ['Unique' => $scanSelected]);
    }

    public function createScan($data) {
        $data['Status'] = 1;
        $data['Station'] = $data['Location'];
        $data['Created'] = date('Y-m-d H:i:s');
        $data['CreatedBy'] = $this->session->userdata('userid');
//        $data['ImportFile'] = $data['filename'];
        $filenameToGetData = $data['filename'];
        $filenameToGetData = explode(',', $filenameToGetData);
        unset($data['filename']);
        //
        $this->db->insert('item_count_scan', $data);
        $id = $this->db->insert_id();
        $this->insert_scan_list($id, $filenameToGetData);
        $this->itemMatchScan($id);

        return $id;
    }

    public function updateScan($id, $data) {
        $data['Status'] = 1;
        $data['Updated'] = date('Y-m-d H:i:s');
        $data['UpdatedBy'] = $this->session->userdata('userid');
        $filenameToGetData = null;
        if(!empty($data['filename']))
             $filenameToGetData = explode(',', $data['filename']);
        unset($data['filename']);
        //
        $this->db->where('Unique', $id);
        $status = $this->db->update('item_count_scan', $data);
        $this->insert_scan_list($id, $filenameToGetData);

        return $status;
    }

    public function deleteScan($id) {
        $updated = date('Y-m-d H:i:s');
        $updatedBy = $this->session->userdata('userid');
        // Soft Delete item_count_scan table
        $this->db->trans_start();
        $this->db->where('Unique', $id);
        $status = $this->db->update('item_count_scan', [
            'Status' => 0,
            'Updated' => $updated,
            'UpdatedBy' => $updatedBy,
        ]);
        $this->db->trans_complete();
        // Soft Delete item_count_scan_list table
        $this->db->trans_start();
        $this->db->where('CountScanUnique', $id);
        $this->db->update('item_count_scan_list', [
            'Status' => 0,
            'Updated' => $updated,
            'UpdatedBy' => $updatedBy,
        ]);
        $this->db->trans_complete();

        return $status;
    }

    protected function insert_scan_list($scanUnique, $filenames = null) {
        if (!is_null($filenames) || !empty($filenames)) {
            $this->load->library('PHPExcel');
            $this->load->library('PHPExcel/IOFactory');
            //
            $decimalQty = $this->session->userdata('admin_DecimalsQuantity');
            foreach ($filenames as $filename) {
                $file = "./assets/csv/{$filename}";
                try {
                    $inputFileType = IOFactory::identify($file);
                    $objReader = IOFactory::createReader($inputFileType);
                    $objPHPExcel = $objReader->load($file);
                    //
                    $sheet = $objPHPExcel->getSheet(0);
                    $highestRow = $sheet->getHighestRow();
                    $highestColumn = $sheet->getHighestColumn();
                    for ($row = 1; $row <= $highestRow; $row++) {
                        $rowData = $sheet->rangeToArray(
                            'A' . $row . ':' . $highestColumn . $row,
                            NULL,
                            FALSE,
                            TRUE
                        );
                        echo "<br><br>";
                        $rowData = $rowData[0];
                        // Inserting into item_count_scan_list table
                        $icsl = [];
                        $icsl['ImportFile'] = $filename;
                        $icsl['CountScanUnique'] = $scanUnique;
                        $icsl['Barcode'] = $rowData[0];
                        $icsl['Quantity'] = (is_null($rowData[1])) ? 0 : (float)$rowData[1]; // rounding to $decimalQty config
                        $icsl['Created'] = date('Y-m-d h:i:s');
                        $icsl['CreatedBy'] = $this->session->userdata('userid');
                        $icsl['Status'] = 1;
                        $this->db->insert('item_count_scan_list', $icsl);
                    }
                } catch(Exception $e) {
                    die('Error loading file "'.pathinfo($file,PATHINFO_BASENAME).'": '.$e->getMessage());
                }
            }
        }

        return false;
    }

    public function itemMatchScan($id) {
        $this->db->select('item_count_scan_list.Unique as ScanUnique, item_count_scan_list.CountScanUnique, item_count_scan_list.ItemUnique,
                        item_count_scan_list.Barcode, item_count_scan_list.Quantity,
                        it.Unique, it.Item, it.Part, it.Status, it.Description');
        $this->db->where('CountScanUnique', $id);
//        $this->db->where('it.Status', 1);
        $this->db->join('item it', 'it.Part = item_count_scan_list.Barcode', 'left');
        $rows = $this->db->get('item_count_scan_list')->result_array();
        $nRows = [];
        foreach ($rows as $row) {
            $isset = (trim($row['Barcode']) == trim($row['Part']) && $row['Status'] == 1) ? true : false;
            $nRows[] = [
                'Unique' => $row['ScanUnique'],
                'ItemUnique' => $row['Unique'],
                'Item' => $isset ? $row['Item'] : null,
                'Part' => $isset ? trim($row['Part']) : null,
                'Description' => $isset ? $row['Description'] : null,
                'Updated' => date('Y-m-d H:i:s'),
                'UpdatedBy' => $this->session->userdata('userid')
            ];
        }
        $this->db->update_batch('item_count_scan_list', $nRows, 'Unique');
        return true;
//        $where = "item_count_scan_list.\"Barcode\" = item.\"Part\" and item.\"Status\" = 1";
//        $where2 = " item_count_scan_list.\"CountScanUnique\" = {$id}" ;
//        $sql = "update item_count_scan_list
//            set \"ItemUnique\" = (CASE WHEN {$where} and {$where2} THEN item.\"Unique\" ELSE null END),
//                \"Item\" = (CASE WHEN {$where} and {$where2} THEN item.\"Item\" ELSE null END),
//                \"Part\" = (CASE WHEN {$where} and {$where2}THEN item.\"Part\" ELSE null END),
//                \"Description\" = (CASE WHEN {$where} and {$where2}THEN item.\"Description\" ELSE null END)
//            from item
//            where {$where}
//            and $where2";
    }

    public function update_scan_list($id, $data) {
        $data['Updated'] = date('Y-m-d H:i:s');
        $data['UpdatedBy'] = $this->session->userdata('userid');
        $this->db->where('Unique', $id);
        return $this->db->update('item_count_scan_list', $data);
    }

    public function delete_scan_list($ids) {
        $data['Updated'] = date('Y-m-d H:i:s');
        $data['UpdatedBy'] = $this->session->userdata('userid');
        $data['Status'] = 0;
        $this->db->where_in('Unique', explode(',', $ids))   ;
        return $this->db->update('item_count_scan_list', $data);
    }

}