import { Button as Btn, Icon } from "semantic-ui-react";
import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Container, Button, Row, Col, Spinner } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"; 
import paginationFactory from "react-bootstrap-table2-paginator"; 
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import swal from "sweetalert";
import {
  deleteUser,
  postUserCreate,
  putUserUpdate,
} from "../actions/productAction";

/*------------*/
const { SearchBar } = Search;

/*---------------------------------*/
const defaultSorted = [
  {
    dataField: "id",
    order: "asc",
  },
];

/*-Tableau------------------------------------------------------------------------*/
const TableComponent = (props) => {
  const handleClick = (dispatch, row) => {
    swal({
      title: "Voulez-vous vraiment supprimer ces données?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        props.deleteUser(row, props.currentUser);
        swal("Données du produit supprimées avec succès", {
          icon: "success",
        });
      } else {
        swal("Impossible de supprimer les données");
      }
    });
  };

  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true, 
      headerStyle: () => {
        return { width: "5%" };
      },
    },
    {
      dataField: "annee",
      text: "Année",
      sort: true,
      headerStyle: () => {
        return { width: "10%" };
      },
    },
    {
      dataField: "saison",
      text: "Saison",
      sort: true,
      headerStyle: () => {
        return { width: "10%" };
      },
    },
    {
      dataField: "createur",
      text: "Createur",
      sort: true,
      headerStyle: () => {
        return { width: "10%" };
      },
    },
    {
      dataField: "gamme",
      text: "Gamme",
      sort: true,
      headerStyle: () => {
        return { width: "10%" };
      },
    },
    {
      dataField: "sex",
      text: "Sex",
      sort: true,
      headerStyle: () => {
        return { width: "10%" };
      },
    },
    {
      dataField: "modele",
      text: "Modéle",
      sort: true,
      headerStyle: () => {
        return { width: "10%" };
      },
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      headerStyle: () => {
        return { width: "10%" };
      },
    },
    {
      dataField: "mesure",
      text: "Mesure",
      sort: true,
      headerStyle: () => {
        return { width: "10%" };
      },
    },
    {
      dataField: "link",
      text: "Action",
      headerStyle: () => {
        return { width: "31%" };
      },
      /*-btn:details-edit-delete---------------------------------------------------------*/
      formatter: (rowContent, row) => {
        return (
          <div>
            <Link to={"detail/" + row.id}>
              <Button color="dark" className="mr-2 styleb">
                <FontAwesomeIcon icon={faInfo} /> Détail
              </Button>
            </Link>

            <Link to={"edit/" + row.id}>
              <Button color="dark" className="mr-2 styleb">
                <FontAwesomeIcon icon={faEdit} /> Editer
              </Button>
            </Link>

            <Button
              color="dark"
              className="mr-2 styleb" 
              onClick={() => handleClick(props.dispatch, row)}
            >
              <FontAwesomeIcon icon={faTrash} /> Supprimer
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Container>
      {props.getUsersList ? (
        <ToolkitProvider
          bootstrap4
          keyField="id"
          data={props.getUsersList}
          columns={columns}
          defaultSorted={defaultSorted}
          search
        >
          {(props) => (
            <div>
              <Row>
                <Col>
                  <Link to="/create">
                    <Btn className="styleb" icon labelPosition="left">
                      <Icon name="add product" />
                      Ajouter un produit
                    </Btn>
                  </Link>
                </Col>

                {/*-search-------------------*/}
                <Col>
                  <div className="float-right">
                    <SearchBar className="styleb" {...props.searchProps} placeholder="Search .." />
                  </div>
                </Col>
              </Row>
              <BootstrapTable
                {...props.baseProps}
                pagination={paginationFactory()} 
              />
            </div>
          )}
        </ToolkitProvider>
      ) : (
        /*-search---------------------- */
        <div className="text-center">
          {props.errorUsersList ? (
            <h4>{props.errorUsersList}</h4>
          ) : (
            <Spinner color="dark" />
          )}
        </div>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    getUsersList: state.users.getUsersList,
    errorUsersList: state.users.errorUsersList,
  };
};

export default connect(mapStateToProps, {
  postUserCreate,
  putUserUpdate,
  deleteUser,
})(TableComponent);