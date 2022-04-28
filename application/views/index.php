<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>

<!DOCTYPE html>
<html lang="en">
    <head>
       <?php $this->load->view("includes/head"); ?>
    </head>
    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="text-center">ROCKET CONTROL STATION</h4>
                        </div>
                        <ul class="list-group list-group-flush" id="weather">
                            <li class="list-group-item text-center">
                                <div class="fa-2x"><i class="fas fa-spinner fa-spin"></i></div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-sm-9">
                    <div class="card border border-primary rocket-area">
                        <div class="card-header">
                            <h4 class="text-center">ROCKET LIST</h4>
                        </div>
                        <div>
                            <div class="row" id="space">
                                <div class="fa-2x text-center"><i class="fas fa-spinner fa-spin"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php $this->load->view("includes/script"); ?>
    </body>
</html>