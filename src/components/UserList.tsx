import { SortBy, User } from "../types.d"




interface Props{
    handleSortBy:(sort: SortBy)=> void;
    users: User[];
    showColor: boolean;
    handleDelete: (email: string)=> void;
}

export default function UserList({handleSortBy,users,showColor, handleDelete}:Props){
    
    return(
        <table width='100%'>     
            <thead>
                <tr>
                    <th>Foto</th>
                    <th className="sort-button" onClick={()=> handleSortBy(SortBy.NAME)}>Nombre</th>
                    <th className="sort-button" onClick={()=> handleSortBy(SortBy.LAST)}>Apellido</th>
                    <th className="sort-button" onClick={()=> handleSortBy(SortBy.COUNTRY)}>País</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className={showColor?"table__show-color":""}>
                {users && users.map((user)=>(
                    <tr key={user.email}>
                    <td><img src={user.picture.thumbnail} alt="" /></td>
                    <td>{user.name.first}</td>
                    <td>{user.name.last}</td>
                    <td>{user.location.country}</td>
                    <td>
                        <button onClick={()=> handleDelete(user.email)} style={{backgroundColor:'#222222', color: "#FFF"}}>Borrar</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    )
}